import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), "entry.png");
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const outputPath = join(outputDir, "entry.png");

let source: Buffer;
try {
  source = readFileSync(sourcePath);
} catch {
  fail(`cannot read source image at ${sourcePath}`);
}

const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
let format = "unknown";
if (source.subarray(0, 8).equals(pngMagic)) format = "PNG";
else if (source.subarray(0, 3).equals(jpegMagic)) format = "JPEG";
if (format === "unknown") fail(`source image at ${sourcePath} is neither PNG nor JPEG`);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, source);

if (!existsSync(outputPath)) fail(`output missing after copy: ${outputPath}`);
const copiedSize = statSync(outputPath).size;
if (copiedSize !== source.length) {
  fail(`size mismatch after copy: source ${source.length} bytes, output ${copiedSize} bytes`);
}
const copied = readFileSync(outputPath);
if (!copied.equals(source)) {
  fail(`byte mismatch after copy: ${outputPath} differs from ${sourcePath}`);
}
const digest = createHash("sha256").update(copied).digest("hex");
console.log(`copied ${format} image: ${source.length} bytes -> ${copiedSize} bytes, sha256 ${digest}, output ${outputPath}`);

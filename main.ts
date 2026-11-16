import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Whale Mage — Lightning Orb, v1.6.
// Copies entry.png byte-for-byte into the make.fun output directory and
// verifies the copy by reading it back before reporting success.

const HERE = dirname(fileURLToPath(import.meta.url));
const IMAGE_NAME = "entry.png";

function fail(message: string): never {
  console.error(`whale-mage v1.6: ERROR: ${message}`);
  process.exit(1);
}

function main(): void {
  const sourcePath = join(HERE, IMAGE_NAME);
  if (!existsSync(sourcePath)) {
    fail(`source image not found beside main.ts: ${sourcePath}`);
  }
  const sourceBytes = readFileSync(sourcePath);
  if (sourceBytes.length === 0) {
    fail(`source image is empty: ${sourcePath}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, IMAGE_NAME);
  writeFileSync(outPath, sourceBytes);

  verifyCopy(sourcePath, outPath, sourceBytes);
}

function verifyCopy(sourcePath: string, outPath: string, sourceBytes: Buffer): void {
  // v1.6: confirm the output file exists and can be re-read, then compare
  // every byte against the source before declaring the copy good.
  if (!existsSync(outPath)) {
    fail(`output file missing after copy: ${outPath}`);
  }
  const outStat = statSync(outPath);
  if (!outStat.isFile()) {
    fail(`output path is not a regular file: ${outPath}`);
  }
  const outBytes = readFileSync(outPath);
  if (!outBytes.equals(sourceBytes)) {
    fail(`byte mismatch: output ${outPath} differs from source ${sourcePath}`);
  }
  console.log(
    `whale-mage v1.6: wrote ${outPath} (source ${sourceBytes.length} bytes, output ${outBytes.length} bytes) — verified identical`,
  );
}

main();

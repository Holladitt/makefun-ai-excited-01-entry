/**
 * Whale Mage — Lightning Orb (make.fun ai-excited-01, v1.5)
 *
 * The entry artwork is entry.png, a 1024x1024 JPEG kept beside this file.
 * This program copies those exact bytes into the output directory and
 * then proves the copy is faithful: it checks the sizes match and reads
 * the output back for a byte-for-byte comparison, failing loudly on any
 * mismatch instead of silently shipping a damaged image.
 */

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const INPUT_NAME = "entry.png";
const OUTPUT_NAME = "entry.png";

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function loadInput(inputPath: string): Buffer {
  let bytes: Buffer;
  try {
    bytes = readFileSync(inputPath);
  } catch {
    fail(`could not read ${inputPath}`);
  }
  if (bytes.length === 0) {
    fail(`input ${inputPath} is empty`);
  }
  return bytes;
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const inputPath = join(here, INPUT_NAME);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = join(outputDir, OUTPUT_NAME);

  const inputBytes = loadInput(inputPath);

  // Create the output directory if it is not there yet, then copy.
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, inputBytes);

  // v1.5: size check. The file on disk must be exactly as large as the
  // input, and both sizes are printed so a human can see the match.
  const outputSize = statSync(outputPath).size;
  console.log(`size check: input ${inputBytes.length} bytes, output ${outputSize} bytes`);
  if (outputSize !== inputBytes.length) {
    fail(
      `size mismatch: wrote ${outputSize} bytes to ${outputPath} ` +
        `but the input is ${inputBytes.length} bytes`,
    );
  }

  // Read the written file back and compare every byte with the input.
  // A single differing byte fails the run loudly.
  const writtenBytes = readFileSync(outputPath);
  if (writtenBytes.length !== inputBytes.length || !writtenBytes.equals(inputBytes)) {
    fail(
      `byte mismatch: ${outputPath} (${writtenBytes.length} bytes) ` +
        `does not match ${inputPath} (${inputBytes.length} bytes)`,
    );
  }

  console.log(`wrote ${outputPath} (${inputBytes.length} bytes, verified identical)`);
}

try {
  main();
} catch (cause) {
  fail(cause instanceof Error ? cause.message : String(cause));
}

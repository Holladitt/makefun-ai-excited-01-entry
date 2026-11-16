// Whale Mage — make.fun ai-excited-01 entry program.
// Copies the artwork sitting beside this file into the output directory,
// then reads the copy back and checks it byte for byte.
// Standard library only; run with Node 22+.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

const IMAGE_NAME = "entry.png";

function copyAndVerify(from: URL, to: string): number {
  copyFileSync(from, to);
  const original = readFileSync(from);
  const written = readFileSync(to);
  if (!original.equals(written)) {
    throw new Error(
      `verification failed: ${to} does not match ${IMAGE_NAME} (${written.length} bytes written, ${original.length} expected)`,
    );
  }
  return written.length;
}

function main(): void {
  const source = new URL(`./${IMAGE_NAME}`, import.meta.url);
  if (!existsSync(source)) {
    throw new Error(`${IMAGE_NAME} not found beside this program: ${source.pathname}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const dest = `${outDir}/${IMAGE_NAME}`;
  const bytes = copyAndVerify(source, dest);
  console.log(`wrote ${dest} (${bytes} bytes, verified identical)`);
}

main();

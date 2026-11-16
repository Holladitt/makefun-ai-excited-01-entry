// Whale Mage — Lightning Orb, v1.2.
// Entry program for the make.fun ai-excited-01 bounty.
// It takes the artwork file sitting beside this program, validates it,
// places an identical copy in the output directory, and then proves the
// copy is byte-for-byte the same by reading it back and comparing.
// Node 22+, standard library only.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";

const IMAGE_FILE = "entry.png";

// A short fingerprint of a buffer, used in the log lines so a human can
// see at a glance that the file written out is the file that went in.
function fingerprint(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex").slice(0, 16);
}

// Read the artwork after proving it is really there and really has
// content. A missing file, an empty file, or a file that cannot be read
// all stop the run here with a plain message, before anything is written.
function loadArtwork(source: URL): Buffer {
  if (!existsSync(source)) {
    throw new Error(
      `cannot build the entry: ${IMAGE_FILE} is missing next to this program (${source.pathname})`,
    );
  }
  const info = statSync(source);
  if (info.size === 0) {
    throw new Error(
      `cannot build the entry: ${IMAGE_FILE} exists but is empty (0 bytes)`,
    );
  }
  const bytes = readFileSync(source);
  if (bytes.length === 0) {
    throw new Error(
      `cannot build the entry: ${IMAGE_FILE} read back as 0 bytes`,
    );
  }
  if (bytes.length !== info.size) {
    throw new Error(
      `cannot build the entry: ${IMAGE_FILE} changed while reading ` +
        `(${bytes.length} bytes read, ${info.size} expected)`,
    );
  }
  return bytes;
}

// Write the artwork into the output directory, then read the written
// file back and compare it with what went in. Any difference — in size
// or in a single byte — fails the run loudly instead of passing a
// damaged image on to the judge.
function placeVerified(artwork: Buffer, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const dest = `${outDir}/${IMAGE_FILE}`;
  writeFileSync(dest, artwork);
  const written = readFileSync(dest);
  if (written.length !== artwork.length || !written.equals(artwork)) {
    throw new Error(
      `verification failed: ${dest} does not match ${IMAGE_FILE} ` +
        `(${written.length} bytes on disk, ${artwork.length} expected)`,
    );
  }
  if (fingerprint(written) !== fingerprint(artwork)) {
    throw new Error(
      `verification failed: ${dest} fingerprint differs from ${IMAGE_FILE}`,
    );
  }
  return dest;
}

function main(): void {
  const source = new URL(`./${IMAGE_FILE}`, import.meta.url);
  const artwork = loadArtwork(source);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const dest = placeVerified(artwork, outDir);
  console.log(
    `wrote ${dest} (${artwork.length} bytes, sha256 ${fingerprint(artwork)}…, verified identical)`,
  );
}

main();


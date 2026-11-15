// Whale Mage entry for make.fun ai-excited-01 (Node 22, standard library only).
//
// The artwork lives in this repository as entry.png. This program reads those
// exact bytes and writes them back out, unchanged, as entry.png in the output
// directory. The judge therefore sees precisely the file that was built here.
// The program is deterministic: every run reads the same file and writes the
// same bytes, so two runs always produce identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });

const artwork = readFileSync(join(repoDir, "entry.png"));
writeFileSync(outFile, artwork);

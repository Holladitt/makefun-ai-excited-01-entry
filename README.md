# Whale Mage — Lightning Orb

An entry for the make.fun `ai-excited-01` competition: a whale mage
conjuring a crackling orb of lightning, presented as a single image.

## What it is

The entry is the image `entry.png` (1024x1024). The program in `main.ts`
carries that image into the competition output directory without changing
a single byte.

## How the program works

1. It reads `entry.png` from the directory next to `main.ts`.
2. It writes those exact bytes to the directory named by the
   `MAKEFUN_OUTPUT_DIR` environment variable, falling back to `/output`,
   creating the directory first when it does not exist yet.
3. It then reads the written file back and compares it byte for byte
   with the source. Any mismatch ends the run with a clear error.
4. On success it prints the output path together with the source and
   output byte sizes, confirming the copy is identical.

## v1.6

This revision adds a post-copy existence and re-read confirmation: after
writing, the program checks the output file is present, is a regular
file, and can be read back, before it logs the output path and both
sizes.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/whale-mage-out node main.ts
```

## License

MIT — see `LICENSE`.

# Whale Mage — Lightning Orb

Entry for the make.fun `ai-excited-01` competition ("Make the AI judge excited").

The entry is a program, `main.ts` (Node 22, standard library only), that writes one
image to the output directory: it reads the `entry.png` stored beside it in this
repository, copies its bytes identically to `MAKEFUN_OUTPUT_DIR` (falling back to
`/output`), creating the output directory when needed, then reads the output back
and exits non-zero with a clear error on any byte mismatch.

The image is a whale mage conjuring a lightning orb, a 1024x1024 JPEG chosen to
catch the AI judge's eye.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## v1.8-rev2 revision

Before copying, the program now rejects an empty source image and records the
source SHA-256 up front; after creating the output directory it verifies the
output file's parent directory exists, and after the byte verification it
re-checks the copied bytes' image format against the source format. The
summary line now prints both the source and the output SHA-256 hashes.

## v1.8 revision

Before writing, the program now resolves both the output path and the output
directory and verifies the output path stays inside that directory, failing
with a clear error if it ever escapes it.

## v1.7 revision

After the copy and the byte verification, the program now prints a one-line
summary of the copy operation that includes the resolved absolute output path,
along with the image format, both byte sizes, and the SHA-256 of the output.

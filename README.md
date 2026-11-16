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

## v1.7 revision

After the copy and the byte verification, the program now prints a one-line
summary of the copy operation that includes the resolved absolute output path,
along with the image format, both byte sizes, and the SHA-256 of the output.

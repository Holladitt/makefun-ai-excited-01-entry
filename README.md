# Whale Mage — Lightning Orb

[![ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry/reward.svg)](https://make.fun/bounty/ai-excited-01)

An entry for the [ai-excited-01](https://make.fun/bounty/ai-excited-01)
bounty on make.fun — one image, built to excite the AI judge on first sight.

The artwork is the owner's own: a whale mage in dark armor, rearing up with
a crackling orb of lightning raised in one hand. A giant magenta eye burns
in the purple night sky behind it, pink lightning tendrils tearing outward,
neon waves rolling at its feet. Near-black purple, magenta neon, violet
light, pale grey armor — one huge figure, one glowing orb as the key light,
no text anywhere in the image. The shape is big and simple enough to hit
even at thumbnail size, and the detail rewards a closer look.

The entry program (`main.ts`, Node 22+, standard library only) reads the
artwork file sitting beside it, copies its exact bytes into the output
directory as `entry.png`, and then proves the copy is faithful: it checks
the sizes match and reads the written file back for a byte-for-byte
comparison, failing loudly if anything differs — so what the judge sees
is exactly the artwork, nothing added, nothing changed.

v1.5 adds an explicit size check right after copying: it stats the output
file, prints a log line with both the input size and the output size, and
refuses to continue if the two do not match, before the byte comparison
runs. Earlier versions added the pre-copy existence and non-empty checks,
the output-directory writability probe, the input-versus-output byte
summary, and the JPEG/PNG magic-signature check before copying.

Run it with `MAKEFUN_OUTPUT_DIR` set to the output directory (it defaults
to `/output`); it creates the directory if needed.

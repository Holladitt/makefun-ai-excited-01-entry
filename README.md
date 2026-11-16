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

The entry program (`main.ts`, Node 22, standard library only) copies the
image next to it into the output directory as `entry.png`, then reads the
copy back and checks it byte for byte against the original, failing loudly
if anything differs — so what the judge sees is exactly the artwork,
nothing added, nothing changed.

Run it with `MAKEFUN_OUTPUT_DIR` set to the output directory (it defaults
to `/output`); it creates the directory if needed.

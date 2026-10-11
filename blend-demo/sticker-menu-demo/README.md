# Sticker menu — mix-blend-mode demo

Reproduces the xTool O1 landing-page "fly-over" menu effect: menu text that
looks dark on a plain background but flips color like a sticker when it
passes over imagery.

## How it works

The links are plain **white** text with `mix-blend-mode: difference`.
The browser computes `|top - bottom|` per channel, per pixel:

- over white (`255`): `|255-255| = 0`  -> text renders black
- over a photo: each pixel is inverted -> the text shows the complementary
  color of whatever is underneath (the sticker look)

No transparency, no JavaScript painting — one CSS property.

## Run it

Open `index.html` in any modern browser, or serve the folder:

    npx serve .

## Features

- Endless right-to-left image loop (five slides, the sequence repeated
  twice in a track translating `0 -> -50%`; the wrap point is
  pixel-identical, so the loop is seamless)
- Blend mode switcher: normal / difference / exclusion
- Pause / resume the loop
- Live CSS readout of the active mode
- Inter Tight SemiBold (600) with the original computed text attributes:
  `padding-left: 15px`, `position: relative`, `unicode-bidi: isolate`
- Hover micro-interaction, keyboard-focus styles
- `prefers-reduced-motion` support

## Customizing

| What | Where |
|---|---|
| Loop speed | `--loop-speed` in `css/style.css` |
| Stage height | `--stage-h` in `css/style.css` |
| Your images | replace `assets/image1.webp` – `image5.webp` |
| Menu items | edit the `<nav class="menu">` links in `index.html` |

## Gotchas

- The stage needs `isolation: isolate` — blend modes apply within the
  nearest stacking context. Any ancestor with a background, `opacity`,
  `filter`, or `transform` will silently break the effect.
- Symmetrically, the `.menu` wrapper must NOT create its own stacking
  context (no `z-index`, `transform`, or `filter`): that would make the
  links blend with the transparent menu instead of the image track,
  and the white text would render white.
- The text must be pure `#fff` for the math to land on black over white.
- `mix-blend-mode` is supported in all modern browsers (Safari included).

# SteamDiesel MK-V — Acoustic Chronograph

**A dieselpunk instrument panel for Spotify, inspired by mechanical chronographs, engineering drawings and brass workshop instruments.**

SteamDiesel combines a reference-based engraved background, aged parchment, clockwork details, industrial surfaces and a Nixie-inspired playback chronograph. The theme includes two coordinated color schemes:

- **Brass** — warm brass, amber glass, dark oil-black panels and aged paper.
- **RustPatina** — oxidized copper, deep graphite, muted teal and cool instrument markings.

The Living Phonograph extension consumes the active Spicetify color tokens, so its casing, Nixie glow, buttons and progress meter follow the selected scheme.

## Marketplace

This repository is public and already has both required GitHub topics:

- `spicetify-themes`
- `spicetify-extensions`

The root `manifest.json` describes two separate Marketplace entries: the theme and the Living Phonograph extension. See the [official publishing guide](https://github.com/spicetify/marketplace/wiki/Publishing-to-Marketplace).

## Install from Marketplace

After Marketplace indexes the repository:
1. Find **SteamDiesel — Acoustic Chronograph** under **Themes** and install it.
2. Choose **Brass** or **RustPatina** in the theme's color-scheme selector.
3. Install **SteamDiesel Living Phonograph** separately from **Extensions**.

The theme and extension are separate Marketplace cards, but the chronograph uses the same color tokens as the selected theme palette. Adding repository topics does not by itself confirm that the cards are already visible; Marketplace must refresh its index.

## Manual installation

Theme files are at the repository root:

1. Copy `user.css`, `color.ini` and the `assets/` folder into a Spicetify theme folder named `SteamDiesel`.
2. Set the theme and palette:

```powershell
spicetify config current_theme SteamDiesel color_scheme Brass
spicetify apply
```

For the patina palette, replace `Brass` with `RustPatina`.

Install the extension by copying `Extensions/steamdiesel-chronograph.js` into your Spicetify Extensions directory, then:

```powershell
spicetify config extensions steamdiesel-chronograph.js
spicetify apply
```

## Project structure

- `manifest.json` — Marketplace entries for the theme and extension.
- `user.css` — Spotify interface styling and the reference-based mechanical blueprint background.
- `color.ini` — Brass and RustPatina palettes.
- `assets/` — vector engraving and preview artwork.
- `Extensions/` — Living Phonograph extension and its instructions.
- `docs/` — development notes and test checklist.

## Safety and compatibility

- The extension uses the public `Spicetify.Player` wrapper and does not intercept Spotify's audio stream.
- It does not hide Premium or system UI.
- Reduced-motion preferences and keyboard focus are respected.
- Spotify's DOM and Spicetify APIs may change. A real Spotify runtime test is still required.

## License

MIT. See [LICENSE](LICENSE).
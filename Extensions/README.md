# SteamDiesel Living Phonograph

A compact Nixie-style chronograph for the Spotify now-playing bar.

## Install

Copy `steamdiesel-chronograph.js` into your Spicetify Extensions directory, then run:

```powershell
spicetify config extensions steamdiesel-chronograph.js
spicetify apply
```

## Features

- Reads track metadata, playback state, duration and position from `Spicetify.Player`.
- Previous, play/pause and next controls.
- Nixie-style elapsed-time display and progress meter.
- Uses active theme tokens (`--spice-button`, `--spice-button-active`, `--spice-text`, `--spice-subtext`) so Brass and RustPatina stay visually synchronized.
- No AudioContext or protected audio-stream interception.

The Spotify DOM and Spicetify APIs can change. Runtime testing is required on the target Spotify/Spicetify version.
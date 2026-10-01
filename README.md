# Wait for sync

An Obsidian plugin that adds `obsidian://open-synced`. It takes the same `vault` and `file` parameters as `obsidian://open`, and when the note isn't on this device yet it waits up to three minutes for Obsidian Sync to bring it instead of reporting it missing.

It exists for links to notes that an agent has just written on another machine: the note uploads within a second, but a phone only pulls it after Obsidian opens and reconnects. The redirect page at [thesash/obsidian-redirect](https://github.com/thesash/obsidian-redirect) sends `open-synced` links for vaults that have this plugin.

## Install

With [BRAT](https://github.com/TfTHacker/obsidian42-brat): Add beta plugin → `thesash/obsidian-wait-for-sync`, then enable "Wait for sync".

## Release

Bump `version` in `manifest.json`, then `gh release create <version> main.js manifest.json`. BRAT updates each device from the latest release.

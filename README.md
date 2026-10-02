# Wait for sync

An Obsidian plugin that makes `obsidian://open` links wait for Sync. When the linked note isn't on this device yet, it waits up to three minutes for Obsidian Sync to bring it instead of reporting it missing. Links to notes that are already here open as usual.

The plugin wraps Obsidian's own `open` handler, through a private part of the app, so links don't depend on it: a device without the plugin opens the same links the usual way. A custom action like `obsidian://open-synced` (which the plugin still handles) fails with "Unrecognized URI action" on any device where the plugin isn't loaded.

It exists for links to notes that an agent has just written on another machine: the note uploads within a second, but a phone only pulls it after Obsidian opens and reconnects. The redirect page at [thesash/obsidian-redirect](https://github.com/thesash/obsidian-redirect) sends plain `open` links, so this plugin is all a vault needs.

## Install

With [BRAT](https://github.com/TfTHacker/obsidian42-brat): Add beta plugin → `thesash/obsidian-wait-for-sync`, then enable "Wait for sync".

## Release

Bump `version` in `manifest.json`, then `gh release create <version> main.js manifest.json`. BRAT updates each device from the latest release.

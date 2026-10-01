// obsidian://open-synced?vault=<vault>&file=<path> opens a note like obsidian://open, but when the note
// isn't on this device yet it waits for Obsidian Sync to bring it instead of reporting it missing.
const { Plugin, Notice, TFile } = require('obsidian');

const TIMEOUT_MS = 3 * 60 * 1000;

module.exports = class WaitForSync extends Plugin {
  onload() {
    this.registerObsidianProtocolHandler('open-synced', (params) => {
      this.app.workspace.onLayoutReady(() => this.open(params));
    });
  }

  find(linktext) {
    const path = linktext.split('#')[0];
    const file = this.app.metadataCache.getFirstLinkpathDest(path, '') || this.app.vault.getAbstractFileByPath(path);
    return file instanceof TFile ? file : null;
  }

  open(params) {
    const linktext = params.file;
    if (!linktext) return;
    const go = () => this.app.workspace.openLinkText(linktext, '', params.paneType || false);
    if (this.find(linktext)) return go();

    const name = linktext.split('#')[0].split('/').pop();
    const notice = new Notice(`Waiting for Sync to bring "${name}"…`, 0);
    // Sync fires vault events as files arrive; the poll covers a missed event.
    const check = () => {
      if (!this.find(linktext)) return;
      stop();
      go();
    };
    const created = this.app.vault.on('create', check);
    const renamed = this.app.vault.on('rename', check);
    const poll = window.setInterval(check, 1000);
    const timeout = window.setTimeout(() => {
      stop();
      new Notice(`"${name}" hasn't synced after 3 minutes. Check Sync, or that the link is right.`);
    }, TIMEOUT_MS);
    const stop = () => {
      notice.hide();
      this.app.vault.offref(created);
      this.app.vault.offref(renamed);
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
    this.register(stop);
  }
};

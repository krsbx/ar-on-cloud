import { ScrollbarPlugin } from 'smooth-scrollbar';

export class AnchorPlugin extends ScrollbarPlugin {
  static pluginName = 'anchor';

  onHashChange = () => {
    this.jumpToHash(window.location.hash);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick = (event: any) => {
    const { target } = event;

    if (!target) return;

    if (target.tagName !== 'A') {
      return;
    }

    const hash = target.getAttribute('href');

    if (!hash || hash.charAt(0) !== '#') return;

    this.jumpToHash(hash);
  };

  jumpToHash = (hash = '') => {
    const { scrollbar } = this;

    if (!hash || hash.trim() === '') return;

    const hashLocation = document.querySelector<HTMLElement>(hash);

    if (!hashLocation) return;

    // reset scrollTop
    scrollbar.containerEl.scrollTop = 0;

    scrollbar.scrollIntoView(hashLocation);
  };

  onInit = () => {
    this.jumpToHash(window.location.hash);

    window.addEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.addEventListener('click', this.onClick);
  };

  onDestory = () => {
    window.removeEventListener('hashchange', this.onHashChange);

    this.scrollbar.contentEl.removeEventListener('click', this.onClick);
  };
}

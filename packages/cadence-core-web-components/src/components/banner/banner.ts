import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { bannerStyles } from './banner.styles';
import type { BannerType } from './types';

@customElement('cds-banner')
export class CdsBanner extends LitElement {
  static styles = [bannerStyles];

  @property({ reflect: true })
  type?: BannerType;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-banner': CdsBanner;
  }
}

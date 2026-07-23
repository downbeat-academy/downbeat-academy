import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sectionTitleStyles } from './section-title.styles';
import type { SectionTitleAlignment, SectionTitleBackground } from './types';

@customElement('cds-section-title')
export class CdsSectionTitle extends LitElement {
  static styles = [sectionTitleStyles];

  @property({ reflect: true })
  alignment: SectionTitleAlignment = 'left';

  @property({ reflect: true })
  background?: SectionTitleBackground;

  @property({ type: Boolean, attribute: 'has-border', reflect: true })
  hasBorder = true;

  render() {
    return html`
      <slot name="title"></slot>
      <slot name="subtitle"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-section-title': CdsSectionTitle;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sectionContainerStyles } from './section-container.styles';
import type { SectionContainerBackground, SectionContainerBorderColor } from './types';

@customElement('cds-section-container')
export class CdsSectionContainer extends LitElement {
  static styles = [sectionContainerStyles];

  @property({ reflect: true })
  background?: SectionContainerBackground;

  @property({ attribute: 'border-color', reflect: true })
  borderColor: SectionContainerBorderColor = 'primary';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-section-container': CdsSectionContainer;
  }
}

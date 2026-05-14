import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { gridItemStyles } from './grid.styles';
import type { GridSpan } from './types';

@customElement('cds-grid-item')
export class CdsGridItem extends LitElement {
  static styles = [gridItemStyles];

  /** Number of grid columns this item spans. */
  @property({ type: Number, reflect: true })
  span?: GridSpan;

  /** Number of grid rows this item spans. */
  @property({ type: Number, attribute: 'row-span', reflect: true })
  rowSpan?: number;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-grid-item': CdsGridItem;
  }
}

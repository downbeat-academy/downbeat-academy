import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { gridStyles } from './grid.styles';
import type { GridColumns } from './types';

@customElement('cds-grid')
export class CdsGrid extends LitElement {
  static styles = [gridStyles];

  @property({ type: Number, reflect: true })
  columns?: GridColumns;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-grid': CdsGrid;
  }
}

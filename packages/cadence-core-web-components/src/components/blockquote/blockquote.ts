import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { blockquoteStyles } from './blockquote.styles';
import '../text/text';
import '../link/link';

@customElement('cds-blockquote')
export class CdsBlockquote extends LitElement {
  static styles = [blockquoteStyles];

  @property()
  attribution?: string;

  @property()
  link?: string;

  @property({ type: Boolean, reflect: true })
  collapse = false;

  private _renderAttribution() {
    if (!this.attribution) return nothing;

    const attributionText = `– ${this.attribution}`;

    return html`
      <cds-text
        class="attribution"
        tag="p"
        type="expressive-body"
        size="body-small"
        collapse
        data-cy="cds-blockquote-attribution"
      >
        ${this.link
          ? html`<cds-link href=${this.link} type="secondary">${attributionText}</cds-link>`
          : attributionText}
      </cds-text>
    `;
  }

  render() {
    return html`
      <cds-text
        class="quote"
        tag="blockquote"
        type="expressive-body"
        size="body-large"
        collapse
        data-cy="cds-blockquote-quote"
      >
        <em><slot></slot></em>
      </cds-text>
      ${this._renderAttribution()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-blockquote': CdsBlockquote;
  }
}

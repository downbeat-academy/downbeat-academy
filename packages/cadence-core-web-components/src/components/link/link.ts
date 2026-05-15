import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { linkStyles } from './link.styles';
import type { LinkType } from './types';

@customElement('cds-link')
export class CdsLink extends LitElement {
  static styles = [linkStyles];

  @property({ reflect: true })
  type: LinkType = 'primary';

  /** When present, removes the underline decoration. */
  @property({ type: Boolean, attribute: 'no-underline', reflect: true })
  noUnderline = false;

  @property()
  href?: string;

  @property()
  target?: string;

  @property()
  rel?: string;

  render() {
    return html`
      <a
        class="link"
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        rel=${ifDefined(this.rel)}
        data-cy="cds-link"
      >
        <slot></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-link': CdsLink;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { separatorStyles } from './separator.styles';
import type { SeparatorOrientation, SeparatorColor } from './types';

@customElement('cds-separator')
export class CdsSeparator extends LitElement {
  static styles = [separatorStyles];

  @property({ reflect: true })
  orientation: SeparatorOrientation = 'horizontal';

  @property({ reflect: true })
  color: SeparatorColor = 'primary';

  /**
   * When true, the separator is purely visual and hidden from assistive technologies.
   * When false, it has role="separator" and is announced by screen readers.
   */
  @property({ type: Boolean, reflect: true })
  decorative = true;

  render() {
    const role = this.decorative ? 'none' : 'separator';
    const ariaOrientation =
      !this.decorative && this.orientation === 'vertical'
        ? 'vertical'
        : undefined;

    return html`
      <div
        class="separator"
        role=${role}
        aria-orientation=${ariaOrientation ?? ''}
        data-orientation=${this.orientation}
        data-cy="cds-separator"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-separator': CdsSeparator;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { buttonStyles } from './button.styles';
import type { ButtonVariant, ButtonSize, IconPosition } from './types';

@customElement('cds-button')
export class CdsButton extends LitElement {
  static styles = [buttonStyles];

  @property({ reflect: true })
  variant: ButtonVariant = 'primary';

  @property({ reflect: true })
  size: ButtonSize = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  isFullWidth = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  href?: string;

  @property()
  target?: string;

  @property()
  rel?: string;

  @property({ attribute: 'icon-position' })
  iconPosition: IconPosition = 'leading';

  @property()
  type: 'button' | 'submit' | 'reset' = 'button';

  @property()
  name?: string;

  @property({ attribute: 'formaction' })
  formAction?: string;

  @state()
  private _isIconOnly = false;

  @state()
  private _hasIcon = false;

  private _handleDefaultSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot
      .assignedNodes({ flatten: true })
      .filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      );
    this._isIconOnly = nodes.length === 0 && this._hasIcon;
  }

  private _handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const classes = {
      button: true,
      'icon-only': this._isIconOnly,
    };

    const iconSlot = html`<span class="icon-container" aria-hidden="true">
      <slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>
    </span>`;

    const labelSlot = html`<span class="label">
      <slot @slotchange=${this._handleDefaultSlotChange}></slot>
    </span>`;

    const content =
      this._hasIcon && this.iconPosition === 'trailing'
        ? html`${labelSlot}${iconSlot}`
        : html`${iconSlot}${labelSlot}`;

    if (this.href) {
      return html`
        <a
          class=${classMap(classes)}
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this.rel)}
          data-cy="cds-button"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        type=${this.type}
        name=${ifDefined(this.name)}
        formaction=${ifDefined(this.formAction)}
        data-cy="cds-button"
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-button': CdsButton;
  }
}

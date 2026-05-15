import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { badgeStyles } from './badge.styles';
import type { BadgeType, BadgeVariant, BadgeSize } from './types';

@customElement('cds-badge')
export class CdsBadge extends LitElement {
  static styles = [badgeStyles];

  @property({ reflect: true })
  type: BadgeType = 'neutral';

  @property({ reflect: true })
  variant: BadgeVariant = 'filled';

  @property({ reflect: true })
  size: BadgeSize = 'medium';

  @state()
  private _hasIcon = false;

  @state()
  private _hasText = false;

  private _handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleDefaultSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasText = slot
      .assignedNodes({ flatten: true })
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
      );
  }

  render() {
    return html`
      <div class="badge" data-cy="cds-badge">
        <span class="icon" style=${this._hasIcon ? '' : 'display:none'}>
          <slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>
        </span>
        <span class="text">
          <slot @slotchange=${this._handleDefaultSlotChange}></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-badge': CdsBadge;
  }
}

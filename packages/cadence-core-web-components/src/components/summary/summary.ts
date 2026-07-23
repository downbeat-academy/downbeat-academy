import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { summaryStyles } from './summary.styles';
import type { SummaryType, SummarySize } from './types';

@customElement('cds-summary')
export class CdsSummary extends LitElement {
  static styles = [summaryStyles];

  @property({ type: Boolean, attribute: 'is-open', reflect: true })
  isOpen = false;

  @property({ reflect: true })
  type: SummaryType = 'contained';

  @property({ reflect: true })
  size: SummarySize = 'medium';

  @property({ attribute: 'max-width' })
  maxWidth?: string;

  updated(changed: PropertyValues) {
    if (changed.has('maxWidth')) {
      this.style.maxWidth = this.maxWidth ?? '';
    }
  }

  private _onToggle(event: Event) {
    const details = event.currentTarget as HTMLDetailsElement;
    this.isOpen = details.open;
  }

  render() {
    return html`
      <details ?open=${this.isOpen} @toggle=${this._onToggle}>
        <summary>
          <svg
            class="icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071Z"
              fill="currentColor"
            />
          </svg>
          <slot name="title"></slot>
        </summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-summary': CdsSummary;
  }
}

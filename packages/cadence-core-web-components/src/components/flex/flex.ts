import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { flexStyles } from './flex.styles';
import type {
  FlexDirection,
  FlexGap,
  FlexPadding,
  FlexAlign,
  FlexJustify,
  FlexBackground,
} from './types';

@customElement('cds-flex')
export class CdsFlex extends LitElement {
  static styles = [flexStyles];

  @property({ reflect: true })
  direction: FlexDirection = 'column';

  @property({ reflect: true })
  gap: FlexGap = 'none';

  @property({ reflect: true })
  padding: FlexPadding = 'none';

  @property({ attribute: 'align-items', reflect: true })
  alignItems?: FlexAlign;

  @property({ attribute: 'align-content', reflect: true })
  alignContent?: FlexAlign;

  @property({ attribute: 'justify-content', reflect: true })
  justifyContent?: FlexJustify;

  @property({ type: Boolean, reflect: true })
  wrap = false;

  @property({ reflect: true })
  background?: FlexBackground;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-flex': CdsFlex;
  }
}

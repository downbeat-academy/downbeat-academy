import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { textStyles } from './text.styles';
import type { TextType, TextSize, TextColor, TextBackground, TextAlign, TextTag } from './types';

@customElement('cds-text')
export class CdsText extends LitElement {
  static styles = [textStyles];

  @property({ reflect: true })
  type: TextType = 'productive-body';

  @property({ reflect: true })
  size: TextSize = 'body-base';

  @property({ reflect: true })
  color: TextColor = 'primary';

  @property({ reflect: true })
  align: TextAlign = 'left';

  @property({ reflect: true })
  background?: TextBackground;

  @property({ type: Boolean, reflect: true })
  collapse = false;

  /** The HTML tag to render inside shadow DOM for semantics. @default 'div' */
  @property({ reflect: true })
  tag: TextTag = 'div';

  render() {
    const tag = unsafeStatic(this.tag);
    return staticHtml`<${tag} class="text"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-text': CdsText;
  }
}

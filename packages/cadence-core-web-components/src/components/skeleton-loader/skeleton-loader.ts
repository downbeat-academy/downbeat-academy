import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { skeletonLoaderStyles } from './skeleton-loader.styles';
import type { SkeletonDirection } from './types';

@customElement('cds-skeleton-loader')
export class CdsSkeletonLoader extends LitElement {
  static styles = [skeletonLoaderStyles];

  /** Number of skeleton items to render. */
  @property({ type: Number, reflect: true })
  count = 1;

  /** Width of each skeleton item. Accepts any valid CSS value. */
  @property({ reflect: true })
  width = '100%';

  /** Height of each skeleton item. Accepts any valid CSS value. */
  @property({ reflect: true })
  height?: string;

  /** Border-radius of each skeleton item. Accepts any valid CSS value. */
  @property({ attribute: 'border-radius', reflect: true })
  borderRadius = 'var(--cds-radii-medium)';

  /** When present, renders skeleton items as circles (overrides border-radius). */
  @property({ type: Boolean, reflect: true })
  circle = false;

  /** When present, renders skeleton items inline (side-by-side). */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /** Animation direction. */
  @property({ reflect: true })
  direction: SkeletonDirection = 'ltr';

  /** Animation duration in seconds. */
  @property({ type: Number, reflect: true })
  duration = 1.5;

  /** When present, disables the shimmer animation. */
  @property({ type: Boolean, attribute: 'no-animation', reflect: true })
  noAnimation = false;

  private _getItemStyles() {
    const styles: Record<string, string> = {
      width: this.width,
      '--_skeleton-duration': `${this.duration}s`,
    };

    if (this.height) {
      styles['height'] = this.height;
    } else if (this.circle) {
      // For circles, height must equal width
      styles['height'] = this.width;
    } else {
      // Default height matches a line of text
      styles['height'] = '1em';
    }

    if (!this.circle) {
      styles['borderRadius'] = this.borderRadius;
    }

    return styles;
  }

  render() {
    const itemStyles = this._getItemStyles();
    const items = Array.from({ length: this.count }, (_, i) => i);

    return html`
      <div class="skeleton-wrapper" data-cy="cds-skeleton-loader">
        ${repeat(
          items,
          (i) => i,
          () => html`<span class="skeleton" style=${styleMap(itemStyles)}></span>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-skeleton-loader': CdsSkeletonLoader;
  }
}

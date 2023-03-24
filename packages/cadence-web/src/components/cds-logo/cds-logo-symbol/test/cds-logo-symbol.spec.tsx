import { newSpecPage } from '@stencil/core/testing';
import { CdsLogoSymbol } from '../cds-logo-symbol';

describe('cds-logo-symbol', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsLogoSymbol],
      html: `<cds-logo-symbol></cds-logo-symbol>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-logo-symbol>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-logo-symbol>
    `);
  });
});

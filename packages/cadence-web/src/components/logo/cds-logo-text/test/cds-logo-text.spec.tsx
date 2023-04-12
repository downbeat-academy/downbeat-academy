import { newSpecPage } from '@stencil/core/testing';
import { CdsLogoText } from '../cds-logo-text';

describe('cds-logo-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsLogoText],
      html: `<cds-logo-text></cds-logo-text>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-logo-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-logo-text>
    `);
  });
});

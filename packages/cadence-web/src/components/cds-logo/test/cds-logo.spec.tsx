import { newSpecPage } from '@stencil/core/testing';
import { CdsLogo } from '../cds-logo';

describe('cds-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsLogo],
      html: `<cds-logo></cds-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-logo>
    `);
  });
});

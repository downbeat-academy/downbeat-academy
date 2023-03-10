import { newSpecPage } from '@stencil/core/testing';
import { CdsLink } from '../cds-link';

describe('cds-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsLink],
      html: `<cds-link></cds-link>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-link>
    `);
  });
});

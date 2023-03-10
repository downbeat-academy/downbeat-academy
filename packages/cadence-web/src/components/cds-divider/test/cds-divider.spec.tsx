import { newSpecPage } from '@stencil/core/testing';
import { CdsDivider } from '../cds-divider';

describe('cds-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsDivider],
      html: `<cds-divider></cds-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-divider>
    `);
  });
});

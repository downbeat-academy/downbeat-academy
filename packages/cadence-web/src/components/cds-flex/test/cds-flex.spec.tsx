import { newSpecPage } from '@stencil/core/testing';
import { CdsFlex } from '../cds-flex';

describe('cds-flex', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsFlex],
      html: `<cds-flex></cds-flex>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-flex>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-flex>
    `);
  });
});

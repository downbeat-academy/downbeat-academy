import { newSpecPage } from '@stencil/core/testing';
import { CdsButtonSet } from '../cds-button-set';

describe('cds-button-set', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsButtonSet],
      html: `<cds-button-set></cds-button-set>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-button-set>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-button-set>
    `);
  });
});

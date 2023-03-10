import { newSpecPage } from '@stencil/core/testing';
import { CdsText } from '../cds-text';

describe('cds-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsText],
      html: `<cds-text></cds-text>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-text>
    `);
  });
});

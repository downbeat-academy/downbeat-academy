import { newSpecPage } from '@stencil/core/testing';
import { CdsBodyText } from '../cds-body-text';

describe('cds-body-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsBodyText],
      html: `<cds-body-text></cds-body-text>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-body-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-body-text>
    `);
  });
});

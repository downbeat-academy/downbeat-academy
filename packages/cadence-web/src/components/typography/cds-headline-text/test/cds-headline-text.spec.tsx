import { newSpecPage } from '@stencil/core/testing';
import { CdsHeadlineText } from '../cds-headline-text';

describe('cds-headline-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsHeadlineText],
      html: `<cds-headline-text></cds-headline-text>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-headline-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-headline-text>
    `);
  });
});

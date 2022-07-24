import { newSpecPage } from '@stencil/core/testing';
import { CdsBadge } from '../cds-badge';

describe('cds-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsBadge],
      html: `<cds-badge></cds-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-badge>
    `);
  });
});

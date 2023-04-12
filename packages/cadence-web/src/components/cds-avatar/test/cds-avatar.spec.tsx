import { newSpecPage } from '@stencil/core/testing';
import { CdsAvatar } from '../cds-avatar';

describe('cds-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsAvatar],
      html: `<cds-avatar></cds-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-avatar>
    `);
  });
});

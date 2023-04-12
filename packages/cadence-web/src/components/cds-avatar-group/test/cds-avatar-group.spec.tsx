import { newSpecPage } from '@stencil/core/testing';
import { CdsAvatarGroup } from '../cds-avatar-group';

describe('cds-avatar-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsAvatarGroup],
      html: `<cds-avatar-group></cds-avatar-group>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-avatar-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-avatar-group>
    `);
  });
});

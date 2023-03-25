import { newSpecPage } from '@stencil/core/testing';
import { CdsLogoLockup } from '../cds-logo-lockup';

describe('cds-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsLogoLockup],
      html: `<cds-logo></cds-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-logo>
    `);
  });
});

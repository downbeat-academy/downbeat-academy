import { newSpecPage } from '@stencil/core/testing';
import { CdsButton } from '../cds-button';

describe('cds-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdsButton],
      html: `<cds-button></cds-button>`,
    });
    expect(page.root).toEqualHtml(`
      <cds-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cds-button>
    `);
  });
});

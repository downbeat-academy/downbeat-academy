import { newE2EPage } from '@stencil/core/testing';

describe('cds-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-divider></cds-divider>');

    const element = await page.find('cds-divider');
    expect(element).toHaveClass('hydrated');
  });
});

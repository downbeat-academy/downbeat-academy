import { newE2EPage } from '@stencil/core/testing';

describe('cds-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-link></cds-link>');

    const element = await page.find('cds-link');
    expect(element).toHaveClass('hydrated');
  });
});

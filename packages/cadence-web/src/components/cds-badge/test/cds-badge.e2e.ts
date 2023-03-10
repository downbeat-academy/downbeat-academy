import { newE2EPage } from '@stencil/core/testing';

describe('cds-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-badge></cds-badge>');

    const element = await page.find('cds-badge');
    expect(element).toHaveClass('hydrated');
  });
});

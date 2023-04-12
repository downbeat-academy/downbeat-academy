import { newE2EPage } from '@stencil/core/testing';

describe('cds-flex', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-flex></cds-flex>');

    const element = await page.find('cds-flex');
    expect(element).toHaveClass('hydrated');
  });
});

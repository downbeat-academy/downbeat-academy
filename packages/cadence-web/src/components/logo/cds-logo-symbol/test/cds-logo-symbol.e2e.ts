import { newE2EPage } from '@stencil/core/testing';

describe('cds-logo-symbol', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-logo-symbol></cds-logo-symbol>');

    const element = await page.find('cds-logo-symbol');
    expect(element).toHaveClass('hydrated');
  });
});

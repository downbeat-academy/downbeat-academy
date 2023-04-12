import { newE2EPage } from '@stencil/core/testing';

describe('cds-logo-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-logo-text></cds-logo-text>');

    const element = await page.find('cds-logo-text');
    expect(element).toHaveClass('hydrated');
  });
});

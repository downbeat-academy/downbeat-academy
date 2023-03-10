import { newE2EPage } from '@stencil/core/testing';

describe('cds-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-text></cds-text>');

    const element = await page.find('cds-text');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cds-body-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-body-text></cds-body-text>');

    const element = await page.find('cds-body-text');
    expect(element).toHaveClass('hydrated');
  });
});

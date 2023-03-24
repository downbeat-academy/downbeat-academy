import { newE2EPage } from '@stencil/core/testing';

describe('cds-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-logo></cds-logo>');

    const element = await page.find('cds-logo');
    expect(element).toHaveClass('hydrated');
  });
});

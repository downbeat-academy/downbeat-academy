import { newE2EPage } from '@stencil/core/testing';

describe('cds-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-button></cds-button>');

    const element = await page.find('cds-button');
    expect(element).toHaveClass('hydrated');
  });
});

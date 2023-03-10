import { newE2EPage } from '@stencil/core/testing';

describe('cds-button-set', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-button-set></cds-button-set>');

    const element = await page.find('cds-button-set');
    expect(element).toHaveClass('hydrated');
  });
});

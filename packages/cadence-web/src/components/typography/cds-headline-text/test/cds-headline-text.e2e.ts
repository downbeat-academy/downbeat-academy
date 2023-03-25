import { newE2EPage } from '@stencil/core/testing';

describe('cds-headline-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-headline-text></cds-headline-text>');

    const element = await page.find('cds-headline-text');
    expect(element).toHaveClass('hydrated');
  });
});

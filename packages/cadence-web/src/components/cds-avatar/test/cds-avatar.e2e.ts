import { newE2EPage } from '@stencil/core/testing';

describe('cds-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-avatar></cds-avatar>');

    const element = await page.find('cds-avatar');
    expect(element).toHaveClass('hydrated');
  });
});

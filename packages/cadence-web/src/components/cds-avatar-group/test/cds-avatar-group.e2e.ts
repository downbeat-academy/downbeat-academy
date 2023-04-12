import { newE2EPage } from '@stencil/core/testing';

describe('cds-avatar-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cds-avatar-group></cds-avatar-group>');

    const element = await page.find('cds-avatar-group');
    expect(element).toHaveClass('hydrated');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import '../separator';
import type { CdsSeparator } from '../separator';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsSeparator).updateComplete;
}

describe('CdsSeparator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-separator') as CdsSeparator;
    await waitForUpdate(el);

    expect(el.orientation).toBe('horizontal');
    expect(el.color).toBe('primary');
    expect(el.decorative).toBe(true);

    const separator = el.shadowRoot!.querySelector('[data-cy="cds-separator"]');
    expect(separator).toBeTruthy();
  });

  it('reflects orientation attribute', async () => {
    const el = createElement('cds-separator', { orientation: 'vertical' }) as CdsSeparator;
    await waitForUpdate(el);

    expect(el.orientation).toBe('vertical');
    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('reflects color attribute', async () => {
    const el = createElement('cds-separator', { color: 'brand' }) as CdsSeparator;
    await waitForUpdate(el);

    expect(el.color).toBe('brand');
    expect(el.getAttribute('color')).toBe('brand');
  });

  it('applies role="none" when decorative (default)', async () => {
    const el = createElement('cds-separator') as CdsSeparator;
    await waitForUpdate(el);

    const div = el.shadowRoot!.querySelector('.separator');
    expect(div!.getAttribute('role')).toBe('none');
  });

  it('applies role="separator" when non-decorative', async () => {
    const el = createElement('cds-separator') as CdsSeparator;
    el.decorative = false;
    await waitForUpdate(el);

    const div = el.shadowRoot!.querySelector('.separator');
    expect(div!.getAttribute('role')).toBe('separator');
  });

  it('sets data-orientation attribute', async () => {
    const el = createElement('cds-separator', { orientation: 'vertical' }) as CdsSeparator;
    await waitForUpdate(el);

    const div = el.shadowRoot!.querySelector('.separator');
    expect(div!.getAttribute('data-orientation')).toBe('vertical');
  });
});

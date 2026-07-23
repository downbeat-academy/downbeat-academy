import { describe, it, expect, beforeEach } from 'vitest';
import '../section-container';
import type { CdsSectionContainer } from '../section-container';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsSectionContainer).updateComplete;
}

describe('CdsSectionContainer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-section-container') as CdsSectionContainer;
    await waitForUpdate(el);

    expect(el.borderColor).toBe('primary');
    expect(el.background).toBeUndefined();
  });

  it('reflects border-color attribute', async () => {
    const el = createElement('cds-section-container', { 'border-color': 'brand' }) as CdsSectionContainer;
    await waitForUpdate(el);

    expect(el.borderColor).toBe('brand');
    expect(el.getAttribute('border-color')).toBe('brand');
  });

  it('reflects background attribute', async () => {
    const el = createElement('cds-section-container', { background: 'faint' }) as CdsSectionContainer;
    await waitForUpdate(el);

    expect(el.background).toBe('faint');
    expect(el.getAttribute('background')).toBe('faint');
  });

  it('has a default slot', async () => {
    const el = createElement('cds-section-container') as CdsSectionContainer;
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });

  it('accepts all border-color values', async () => {
    const colors = ['primary', 'faint', 'brand', 'interactive', 'success', 'warning', 'critical', 'high-contrast'] as const;
    for (const color of colors) {
      const el = createElement('cds-section-container', { 'border-color': color }) as CdsSectionContainer;
      await waitForUpdate(el);
      expect(el.borderColor).toBe(color);
    }
  });

  it('accepts all background values', async () => {
    const bgs = ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'] as const;
    for (const bg of bgs) {
      const el = createElement('cds-section-container', { background: bg }) as CdsSectionContainer;
      await waitForUpdate(el);
      expect(el.background).toBe(bg);
    }
  });
});

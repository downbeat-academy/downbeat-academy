import { describe, it, expect, beforeEach } from 'vitest';
import '../summary';
import type { CdsSummary } from '../summary';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsSummary).updateComplete;
}

describe('CdsSummary', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-summary') as CdsSummary;
    await waitForUpdate(el);

    expect(el.isOpen).toBe(false);
    expect(el.type).toBe('contained');
    expect(el.size).toBe('medium');
    expect(el.maxWidth).toBeUndefined();
  });

  it('renders a native details element', async () => {
    const el = createElement('cds-summary') as CdsSummary;
    await waitForUpdate(el);

    const details = el.shadowRoot!.querySelector('details');
    expect(details).toBeTruthy();
    expect(details!.open).toBe(false);
  });

  it('opens when is-open is set', async () => {
    const el = createElement('cds-summary', { 'is-open': '' }) as CdsSummary;
    await waitForUpdate(el);

    const details = el.shadowRoot!.querySelector('details') as HTMLDetailsElement;
    expect(el.isOpen).toBe(true);
    expect(details.open).toBe(true);
    expect(el.hasAttribute('is-open')).toBe(true);
  });

  it('reflects type attribute', async () => {
    const el = createElement('cds-summary', { type: 'flush' }) as CdsSummary;
    await waitForUpdate(el);

    expect(el.type).toBe('flush');
    expect(el.getAttribute('type')).toBe('flush');
  });

  it('reflects size attribute', async () => {
    const el = createElement('cds-summary', { size: 'large' }) as CdsSummary;
    await waitForUpdate(el);

    expect(el.size).toBe('large');
    expect(el.getAttribute('size')).toBe('large');
  });

  it('applies max-width style on host', async () => {
    const el = createElement('cds-summary', { 'max-width': '480px' }) as CdsSummary;
    await waitForUpdate(el);

    expect(el.maxWidth).toBe('480px');
    expect(el.style.maxWidth).toBe('480px');
  });

  it('has title and default slots', async () => {
    const el = createElement('cds-summary') as CdsSummary;
    await waitForUpdate(el);

    const root = el.shadowRoot!;
    expect(root.querySelector('slot[name="title"]')).toBeTruthy();
    expect(root.querySelector('slot:not([name])')).toBeTruthy();
  });

  it('includes a chevron icon inside summary', async () => {
    const el = createElement('cds-summary') as CdsSummary;
    await waitForUpdate(el);

    const icon = el.shadowRoot!.querySelector('summary svg.icon');
    expect(icon).toBeTruthy();
    expect(icon!.getAttribute('aria-hidden')).toBe('true');
  });

  it('syncs is-open when the user toggles the details element', async () => {
    const el = createElement('cds-summary') as CdsSummary;
    await waitForUpdate(el);

    const details = el.shadowRoot!.querySelector('details') as HTMLDetailsElement;
    details.open = true;
    details.dispatchEvent(new Event('toggle'));
    await waitForUpdate(el);

    expect(el.isOpen).toBe(true);
  });

  it('accepts all type values', async () => {
    const types = ['contained', 'flush'] as const;
    for (const type of types) {
      const el = createElement('cds-summary', { type }) as CdsSummary;
      await waitForUpdate(el);
      expect(el.type).toBe(type);
    }
  });

  it('accepts all size values', async () => {
    const sizes = ['small', 'medium', 'large'] as const;
    for (const size of sizes) {
      const el = createElement('cds-summary', { size }) as CdsSummary;
      await waitForUpdate(el);
      expect(el.size).toBe(size);
    }
  });
});

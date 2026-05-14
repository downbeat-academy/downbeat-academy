import { describe, it, expect, beforeEach } from 'vitest';
import '../link';
import type { CdsLink } from '../link';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsLink).updateComplete;
}

describe('CdsLink', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-link') as CdsLink;
    el.textContent = 'Click here';
    await waitForUpdate(el);

    expect(el.type).toBe('primary');
    expect(el.noUnderline).toBe(false);

    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor).toBeTruthy();
  });

  it('renders an anchor element', async () => {
    const el = createElement('cds-link', { href: '/about' }) as CdsLink;
    el.textContent = 'About';
    await waitForUpdate(el);

    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor!.getAttribute('href')).toBe('/about');
  });

  it('reflects type attribute', async () => {
    const el = createElement('cds-link', { type: 'secondary' }) as CdsLink;
    el.textContent = 'Secondary';
    await waitForUpdate(el);

    expect(el.type).toBe('secondary');
    expect(el.getAttribute('type')).toBe('secondary');
  });

  it('applies no-underline attribute', async () => {
    const el = createElement('cds-link', { 'no-underline': '' }) as CdsLink;
    el.textContent = 'No underline';
    await waitForUpdate(el);

    expect(el.noUnderline).toBe(true);
    expect(el.hasAttribute('no-underline')).toBe(true);
  });

  it('sets target and rel attributes on anchor', async () => {
    const el = createElement('cds-link', {
      href: 'https://example.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    }) as CdsLink;
    el.textContent = 'External';
    await waitForUpdate(el);

    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor!.getAttribute('target')).toBe('_blank');
    expect(anchor!.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('has data-cy attribute for testing', async () => {
    const el = createElement('cds-link') as CdsLink;
    el.textContent = 'Test';
    await waitForUpdate(el);

    const anchor = el.shadowRoot!.querySelector('[data-cy="cds-link"]');
    expect(anchor).toBeTruthy();
  });

  it('has a default slot', async () => {
    const el = createElement('cds-link') as CdsLink;
    el.textContent = 'Content';
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });

  it('renders all type values', async () => {
    const types = ['primary', 'secondary', 'brand', 'inherit'] as const;
    for (const type of types) {
      const el = createElement('cds-link', { type }) as CdsLink;
      el.textContent = type;
      await waitForUpdate(el);
      expect(el.type).toBe(type);
    }
  });
});

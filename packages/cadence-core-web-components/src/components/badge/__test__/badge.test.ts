import { describe, it, expect, beforeEach } from 'vitest';
import '../badge';
import type { CdsBadge } from '../badge';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsBadge).updateComplete;
}

describe('CdsBadge', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-badge') as CdsBadge;
    el.textContent = 'New';
    await waitForUpdate(el);

    expect(el.type).toBe('neutral');
    expect(el.variant).toBe('filled');
    expect(el.size).toBe('medium');

    const badge = el.shadowRoot!.querySelector('[data-cy="cds-badge"]');
    expect(badge).toBeTruthy();
  });

  it('reflects type attribute', async () => {
    const el = createElement('cds-badge', { type: 'success' }) as CdsBadge;
    el.textContent = 'Done';
    await waitForUpdate(el);

    expect(el.type).toBe('success');
    expect(el.getAttribute('type')).toBe('success');
  });

  it('reflects variant attribute', async () => {
    const el = createElement('cds-badge', { variant: 'outlined' }) as CdsBadge;
    el.textContent = 'Outlined';
    await waitForUpdate(el);

    expect(el.variant).toBe('outlined');
    expect(el.getAttribute('variant')).toBe('outlined');
  });

  it('reflects size attribute', async () => {
    const el = createElement('cds-badge', { size: 'large' }) as CdsBadge;
    el.textContent = 'Large';
    await waitForUpdate(el);

    expect(el.size).toBe('large');
    expect(el.getAttribute('size')).toBe('large');
  });

  it('has icon and default slots', async () => {
    const el = createElement('cds-badge') as CdsBadge;
    el.textContent = 'Badge';
    await waitForUpdate(el);

    const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
    const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(iconSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
  });

  it('has data-cy attribute for testing', async () => {
    const el = createElement('cds-badge') as CdsBadge;
    el.textContent = 'Test';
    await waitForUpdate(el);

    const badge = el.shadowRoot!.querySelector('[data-cy="cds-badge"]');
    expect(badge).toBeTruthy();
  });

  it('renders all type values', async () => {
    const types = ['neutral', 'info', 'success', 'warning', 'error', 'highlight'] as const;
    for (const type of types) {
      const el = createElement('cds-badge', { type }) as CdsBadge;
      el.textContent = type;
      await waitForUpdate(el);
      expect(el.type).toBe(type);
    }
  });

  it('renders all variant values', async () => {
    const variants = ['filled', 'outlined', 'light'] as const;
    for (const variant of variants) {
      const el = createElement('cds-badge', { variant }) as CdsBadge;
      el.textContent = variant;
      await waitForUpdate(el);
      expect(el.variant).toBe(variant);
    }
  });
});

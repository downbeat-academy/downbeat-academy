import { describe, it, expect, beforeEach } from 'vitest';
import '../banner';
import type { CdsBanner } from '../banner';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsBanner).updateComplete;
}

describe('CdsBanner', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-banner') as CdsBanner;
    await waitForUpdate(el);

    expect(el.type).toBeUndefined();
  });

  it('reflects type attribute', async () => {
    const el = createElement('cds-banner', { type: 'primary' }) as CdsBanner;
    await waitForUpdate(el);

    expect(el.type).toBe('primary');
    expect(el.getAttribute('type')).toBe('primary');
  });

  it('accepts all type values', async () => {
    const types = ['primary', 'secondary', 'tertiary'] as const;
    for (const type of types) {
      const el = createElement('cds-banner', { type }) as CdsBanner;
      await waitForUpdate(el);
      expect(el.type).toBe(type);
    }
  });

  it('has a default slot', async () => {
    const el = createElement('cds-banner') as CdsBanner;
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });

  it('projects slotted content', async () => {
    const el = createElement('cds-banner') as CdsBanner;
    el.innerHTML = '<span>Banner message</span>';
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    const assigned = slot.assignedElements();
    expect(assigned.length).toBe(1);
    expect(assigned[0].textContent).toBe('Banner message');
  });
});

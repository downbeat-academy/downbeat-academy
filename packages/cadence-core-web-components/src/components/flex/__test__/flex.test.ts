import { describe, it, expect, beforeEach } from 'vitest';
import '../flex';
import type { CdsFlex } from '../flex';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsFlex).updateComplete;
}

describe('CdsFlex', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-flex') as CdsFlex;
    await waitForUpdate(el);

    expect(el.direction).toBe('column');
    expect(el.gap).toBe('none');
    expect(el.padding).toBe('none');
    expect(el.wrap).toBe(false);
  });

  it('reflects direction attribute', async () => {
    const el = createElement('cds-flex', { direction: 'row' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.direction).toBe('row');
    expect(el.getAttribute('direction')).toBe('row');
  });

  it('reflects gap attribute', async () => {
    const el = createElement('cds-flex', { gap: 'large' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.gap).toBe('large');
    expect(el.getAttribute('gap')).toBe('large');
  });

  it('reflects padding attribute', async () => {
    const el = createElement('cds-flex', { padding: 'medium' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.padding).toBe('medium');
    expect(el.getAttribute('padding')).toBe('medium');
  });

  it('reflects align-items attribute', async () => {
    const el = createElement('cds-flex', { 'align-items': 'center' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.alignItems).toBe('center');
    expect(el.getAttribute('align-items')).toBe('center');
  });

  it('reflects justify-content attribute', async () => {
    const el = createElement('cds-flex', { 'justify-content': 'space-between' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.justifyContent).toBe('space-between');
    expect(el.getAttribute('justify-content')).toBe('space-between');
  });

  it('reflects wrap attribute', async () => {
    const el = createElement('cds-flex', { wrap: '' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.wrap).toBe(true);
    expect(el.hasAttribute('wrap')).toBe(true);
  });

  it('reflects background attribute', async () => {
    const el = createElement('cds-flex', { background: 'faint' }) as CdsFlex;
    await waitForUpdate(el);

    expect(el.background).toBe('faint');
    expect(el.getAttribute('background')).toBe('faint');
  });

  it('has a default slot', async () => {
    const el = createElement('cds-flex') as CdsFlex;
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import '../grid';
import '../grid-item';
import type { CdsGrid } from '../grid';
import type { CdsGridItem } from '../grid-item';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsGrid | CdsGridItem).updateComplete;
}

describe('CdsGrid', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with no columns by default', async () => {
    const el = createElement('cds-grid') as CdsGrid;
    await waitForUpdate(el);

    expect(el.columns).toBeUndefined();
  });

  it('reflects columns attribute', async () => {
    const el = createElement('cds-grid', { columns: '3' }) as CdsGrid;
    await waitForUpdate(el);

    expect(el.columns).toBe(3);
    expect(el.getAttribute('columns')).toBe('3');
  });

  it('has a default slot', async () => {
    const el = createElement('cds-grid') as CdsGrid;
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });

  it('accepts all valid column counts', async () => {
    for (let c = 1; c <= 12; c++) {
      const el = createElement('cds-grid', { columns: String(c) }) as CdsGrid;
      await waitForUpdate(el);
      expect(el.columns).toBe(c);
    }
  });
});

describe('CdsGridItem', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with no span by default', async () => {
    const el = createElement('cds-grid-item') as CdsGridItem;
    await waitForUpdate(el);

    expect(el.span).toBeUndefined();
    expect(el.rowSpan).toBeUndefined();
  });

  it('reflects span attribute', async () => {
    const el = createElement('cds-grid-item', { span: '6' }) as CdsGridItem;
    await waitForUpdate(el);

    expect(el.span).toBe(6);
    expect(el.getAttribute('span')).toBe('6');
  });

  it('reflects row-span attribute', async () => {
    const el = createElement('cds-grid-item', { 'row-span': '2' }) as CdsGridItem;
    await waitForUpdate(el);

    expect(el.rowSpan).toBe(2);
    expect(el.getAttribute('row-span')).toBe('2');
  });

  it('has a default slot', async () => {
    const el = createElement('cds-grid-item') as CdsGridItem;
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });
});

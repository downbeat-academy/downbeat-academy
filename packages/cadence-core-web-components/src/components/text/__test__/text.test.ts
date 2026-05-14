import { describe, it, expect, beforeEach } from 'vitest';
import '../text';
import type { CdsText } from '../text';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsText).updateComplete;
}

describe('CdsText', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-text') as CdsText;
    el.textContent = 'Hello';
    await waitForUpdate(el);

    expect(el.type).toBe('productive-body');
    expect(el.size).toBe('body-base');
    expect(el.color).toBe('primary');
    expect(el.align).toBe('left');
    expect(el.collapse).toBe(false);
    expect(el.tag).toBe('div');
  });

  it('reflects type attribute', async () => {
    const el = createElement('cds-text', { type: 'expressive-headline' }) as CdsText;
    el.textContent = 'Title';
    await waitForUpdate(el);

    expect(el.type).toBe('expressive-headline');
    expect(el.getAttribute('type')).toBe('expressive-headline');
  });

  it('reflects size attribute', async () => {
    const el = createElement('cds-text', { size: 'h1' }) as CdsText;
    el.textContent = 'Big';
    await waitForUpdate(el);

    expect(el.size).toBe('h1');
    expect(el.getAttribute('size')).toBe('h1');
  });

  it('reflects color attribute', async () => {
    const el = createElement('cds-text', { color: 'faint' }) as CdsText;
    el.textContent = 'Faint';
    await waitForUpdate(el);

    expect(el.color).toBe('faint');
  });

  it('reflects align attribute', async () => {
    const el = createElement('cds-text', { align: 'center' }) as CdsText;
    el.textContent = 'Centered';
    await waitForUpdate(el);

    expect(el.align).toBe('center');
  });

  it('sets collapse attribute', async () => {
    const el = createElement('cds-text', { collapse: '' }) as CdsText;
    el.textContent = 'Collapsed';
    await waitForUpdate(el);

    expect(el.collapse).toBe(true);
    expect(el.hasAttribute('collapse')).toBe(true);
  });

  it('renders inner element with correct tag', async () => {
    const el = createElement('cds-text', { tag: 'p' }) as CdsText;
    el.textContent = 'Paragraph';
    await waitForUpdate(el);

    const inner = el.shadowRoot!.querySelector('p');
    expect(inner).toBeTruthy();
    expect(inner!.classList.contains('text')).toBe(true);
  });

  it('defaults to div tag', async () => {
    const el = createElement('cds-text') as CdsText;
    el.textContent = 'Default tag';
    await waitForUpdate(el);

    const inner = el.shadowRoot!.querySelector('div.text');
    expect(inner).toBeTruthy();
  });

  it('has a default slot', async () => {
    const el = createElement('cds-text') as CdsText;
    el.textContent = 'Content';
    await waitForUpdate(el);

    const slot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(slot).toBeTruthy();
  });
});

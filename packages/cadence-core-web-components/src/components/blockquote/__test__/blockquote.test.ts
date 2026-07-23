import { describe, it, expect, beforeEach } from 'vitest';
import '../blockquote';
import type { CdsBlockquote } from '../blockquote';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsBlockquote).updateComplete;
}

describe('CdsBlockquote', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-blockquote') as CdsBlockquote;
    await waitForUpdate(el);

    expect(el.attribution).toBeUndefined();
    expect(el.link).toBeUndefined();
    expect(el.collapse).toBe(false);
  });

  it('renders the quote slot inside a cds-text element', async () => {
    const el = createElement('cds-blockquote') as CdsBlockquote;
    el.textContent = 'A quote';
    await waitForUpdate(el);

    const quote = el.shadowRoot!.querySelector('cds-text.quote');
    expect(quote).toBeTruthy();
    expect(quote!.getAttribute('tag')).toBe('blockquote');

    const slot = quote!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot).toBeTruthy();
    expect(slot.assignedNodes()[0]?.textContent).toBe('A quote');
  });

  it('omits attribution when not set', async () => {
    const el = createElement('cds-blockquote') as CdsBlockquote;
    await waitForUpdate(el);

    expect(el.shadowRoot!.querySelector('cds-text.attribution')).toBeNull();
  });

  it('renders attribution when set', async () => {
    const el = createElement('cds-blockquote', { attribution: 'Jane Doe' }) as CdsBlockquote;
    await waitForUpdate(el);

    const attribution = el.shadowRoot!.querySelector('cds-text.attribution');
    expect(attribution).toBeTruthy();
    expect(attribution!.textContent).toContain('Jane Doe');
    expect(attribution!.textContent).toContain('–');
  });

  it('wraps attribution in a cds-link when link is set', async () => {
    const el = createElement('cds-blockquote', {
      attribution: 'Jane Doe',
      link: 'https://example.com',
    }) as CdsBlockquote;
    await waitForUpdate(el);

    const link = el.shadowRoot!.querySelector('cds-text.attribution cds-link');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('https://example.com');
    expect(link!.getAttribute('type')).toBe('secondary');
    expect(link!.textContent).toContain('Jane Doe');
  });

  it('reflects collapse attribute', async () => {
    const el = createElement('cds-blockquote', { collapse: '' }) as CdsBlockquote;
    await waitForUpdate(el);

    expect(el.collapse).toBe(true);
    expect(el.hasAttribute('collapse')).toBe(true);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import '../section-title';
import type { CdsSectionTitle } from '../section-title';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsSectionTitle).updateComplete;
}

describe('CdsSectionTitle', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-section-title') as CdsSectionTitle;
    await waitForUpdate(el);

    expect(el.alignment).toBe('left');
    expect(el.background).toBeUndefined();
    expect(el.hasBorder).toBe(true);
    expect(el.hasAttribute('has-border')).toBe(true);
  });

  it('reflects alignment attribute', async () => {
    const el = createElement('cds-section-title', { alignment: 'center' }) as CdsSectionTitle;
    await waitForUpdate(el);

    expect(el.alignment).toBe('center');
    expect(el.getAttribute('alignment')).toBe('center');
  });

  it('reflects background attribute', async () => {
    const el = createElement('cds-section-title', { background: 'brand' }) as CdsSectionTitle;
    await waitForUpdate(el);

    expect(el.background).toBe('brand');
    expect(el.getAttribute('background')).toBe('brand');
  });

  it('can disable has-border', async () => {
    const el = document.createElement('cds-section-title') as CdsSectionTitle;
    el.hasBorder = false;
    document.body.appendChild(el);
    await waitForUpdate(el);

    expect(el.hasBorder).toBe(false);
    expect(el.hasAttribute('has-border')).toBe(false);
  });

  it('accepts all alignment values', async () => {
    const alignments = ['left', 'center', 'right'] as const;
    for (const alignment of alignments) {
      const el = createElement('cds-section-title', { alignment }) as CdsSectionTitle;
      await waitForUpdate(el);
      expect(el.alignment).toBe(alignment);
    }
  });

  it('accepts all background values', async () => {
    const bgs = ['primary', 'faint', 'high-contrast', 'brand', 'interactive', 'success', 'warning', 'critical'] as const;
    for (const bg of bgs) {
      const el = createElement('cds-section-title', { background: bg }) as CdsSectionTitle;
      await waitForUpdate(el);
      expect(el.background).toBe(bg);
    }
  });

  it('has title, subtitle, and default slots', async () => {
    const el = createElement('cds-section-title') as CdsSectionTitle;
    await waitForUpdate(el);

    const root = el.shadowRoot!;
    expect(root.querySelector('slot[name="title"]')).toBeTruthy();
    expect(root.querySelector('slot[name="subtitle"]')).toBeTruthy();
    expect(root.querySelector('slot:not([name])')).toBeTruthy();
  });

  it('projects content into the correct slots', async () => {
    const el = createElement('cds-section-title') as CdsSectionTitle;
    el.innerHTML = `
      <h2 slot="title">Title</h2>
      <p slot="subtitle">Subtitle</p>
      <div>Body</div>
    `;
    await waitForUpdate(el);

    const titleSlot = el.shadowRoot!.querySelector('slot[name="title"]') as HTMLSlotElement;
    const subtitleSlot = el.shadowRoot!.querySelector('slot[name="subtitle"]') as HTMLSlotElement;
    const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;

    expect(titleSlot.assignedElements()[0]?.tagName).toBe('H2');
    expect(subtitleSlot.assignedElements()[0]?.tagName).toBe('P');
    expect(defaultSlot.assignedElements()[0]?.tagName).toBe('DIV');
  });
});

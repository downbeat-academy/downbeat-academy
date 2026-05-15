import { describe, it, expect, beforeEach } from 'vitest';
import '../skeleton-loader';
import type { CdsSkeletonLoader } from '../skeleton-loader';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsSkeletonLoader).updateComplete;
}

describe('CdsSkeletonLoader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-skeleton-loader') as CdsSkeletonLoader;
    await waitForUpdate(el);

    expect(el.count).toBe(1);
    expect(el.width).toBe('100%');
    expect(el.direction).toBe('ltr');
    expect(el.duration).toBe(1.5);
    expect(el.circle).toBe(false);
    expect(el.inline).toBe(false);
    expect(el.noAnimation).toBe(false);
  });

  it('renders the correct number of skeleton items', async () => {
    const el = createElement('cds-skeleton-loader', { count: '3' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    const items = el.shadowRoot!.querySelectorAll('.skeleton');
    expect(items.length).toBe(3);
  });

  it('renders a single skeleton item by default', async () => {
    const el = createElement('cds-skeleton-loader') as CdsSkeletonLoader;
    await waitForUpdate(el);

    const items = el.shadowRoot!.querySelectorAll('.skeleton');
    expect(items.length).toBe(1);
  });

  it('has data-cy attribute for testing', async () => {
    const el = createElement('cds-skeleton-loader') as CdsSkeletonLoader;
    await waitForUpdate(el);

    const wrapper = el.shadowRoot!.querySelector('[data-cy="cds-skeleton-loader"]');
    expect(wrapper).toBeTruthy();
  });

  it('reflects circle attribute', async () => {
    const el = createElement('cds-skeleton-loader', { circle: '' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    expect(el.circle).toBe(true);
    expect(el.hasAttribute('circle')).toBe(true);
  });

  it('reflects inline attribute', async () => {
    const el = createElement('cds-skeleton-loader', { inline: '' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    expect(el.inline).toBe(true);
  });

  it('reflects no-animation attribute', async () => {
    const el = createElement('cds-skeleton-loader', { 'no-animation': '' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    expect(el.noAnimation).toBe(true);
    expect(el.hasAttribute('no-animation')).toBe(true);
  });

  it('reflects direction attribute', async () => {
    const el = createElement('cds-skeleton-loader', { direction: 'rtl' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    expect(el.direction).toBe('rtl');
  });

  it('applies width to skeleton items', async () => {
    const el = createElement('cds-skeleton-loader', { width: '200px' }) as CdsSkeletonLoader;
    await waitForUpdate(el);

    const item = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
    expect(item.style.width).toBe('200px');
  });
});

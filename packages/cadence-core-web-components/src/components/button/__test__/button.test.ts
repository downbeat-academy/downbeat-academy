import { describe, it, expect, beforeEach } from 'vitest';
import '../button';
import type { CdsButton } from '../button';

function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

async function waitForUpdate(el: HTMLElement): Promise<void> {
  await (el as CdsButton).updateComplete;
}

describe('CdsButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default properties', async () => {
    const el = createElement('cds-button') as CdsButton;
    el.textContent = 'Click me';
    await waitForUpdate(el);

    expect(el.variant).toBe('primary');
    expect(el.size).toBe('medium');
    expect(el.disabled).toBe(false);
    expect(el.isFullWidth).toBe(false);

    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.classList.contains('button')).toBe(true);
  });

  it('renders as anchor when href is set', async () => {
    const el = createElement('cds-button', { href: '/test' }) as CdsButton;
    el.textContent = 'Link';
    await waitForUpdate(el);

    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor!.getAttribute('href')).toBe('/test');

    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeNull();
  });

  it('applies disabled attribute to inner button', async () => {
    const el = createElement('cds-button', { disabled: '' }) as CdsButton;
    el.textContent = 'Disabled';
    await waitForUpdate(el);

    const button = el.shadowRoot!.querySelector('button');
    expect(button!.hasAttribute('disabled')).toBe(true);
  });

  it('reflects variant attribute', async () => {
    const el = createElement('cds-button', { variant: 'secondary' }) as CdsButton;
    el.textContent = 'Secondary';
    await waitForUpdate(el);

    expect(el.variant).toBe('secondary');
    expect(el.getAttribute('variant')).toBe('secondary');
  });

  it('reflects size attribute', async () => {
    const el = createElement('cds-button', { size: 'large' }) as CdsButton;
    el.textContent = 'Large';
    await waitForUpdate(el);

    expect(el.size).toBe('large');
    expect(el.getAttribute('size')).toBe('large');
  });

  it('sets button type attribute', async () => {
    const el = createElement('cds-button', { type: 'submit' }) as CdsButton;
    el.textContent = 'Submit';
    await waitForUpdate(el);

    const button = el.shadowRoot!.querySelector('button');
    expect(button!.getAttribute('type')).toBe('submit');
  });

  it('applies full-width attribute', async () => {
    const el = createElement('cds-button', { 'full-width': '' }) as CdsButton;
    el.textContent = 'Full Width';
    await waitForUpdate(el);

    expect(el.isFullWidth).toBe(true);
    expect(el.hasAttribute('full-width')).toBe(true);
  });

  it('sets anchor target and rel attributes', async () => {
    const el = createElement('cds-button', {
      href: 'https://example.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    }) as CdsButton;
    el.textContent = 'External Link';
    await waitForUpdate(el);

    const anchor = el.shadowRoot!.querySelector('a');
    expect(anchor!.getAttribute('target')).toBe('_blank');
    expect(anchor!.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('has data-cy attribute for testing', async () => {
    const el = createElement('cds-button') as CdsButton;
    el.textContent = 'Test';
    await waitForUpdate(el);

    const button = el.shadowRoot!.querySelector('[data-cy="cds-button"]');
    expect(button).toBeTruthy();
  });

  it('has icon and label slots', async () => {
    const el = createElement('cds-button') as CdsButton;
    el.textContent = 'Button';
    await waitForUpdate(el);

    const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
    const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])');
    expect(iconSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
  });
});

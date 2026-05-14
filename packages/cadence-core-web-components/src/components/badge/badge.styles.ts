import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-flex;
    width: fit-content;
    height: fit-content;
  }

  .badge {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    font-family: var(--cds-typography-font-family-productive-body);
    font-weight: 700;
    border-radius: var(--cds-radii-soft);
    width: fit-content;
    gap: var(--cds-scale-3x-small);
  }

  /* Sizes */
  :host([size='small']) .badge {
    font-size: var(--cds-typography-font-size-fixed-productive-x-small);
    line-height: 16px;
    padding: var(--cds-scale-3x-small) var(--cds-scale-x-small);
  }

  :host([size='medium']) .badge,
  :host(:not([size])) .badge {
    font-size: var(--cds-typography-font-size-fixed-productive-small);
    line-height: 20px;
    padding: var(--cds-scale-3x-small) var(--cds-scale-x-small);
  }

  :host([size='large']) .badge {
    font-size: var(--cds-typography-font-size-fixed-productive-base);
    line-height: 24px;
    padding: var(--cds-scale-2x-small) var(--cds-scale-small);
  }

  /* filled + type */
  :host([variant='filled'][type='neutral']) .badge,
  :host(:not([variant])[type='neutral']) .badge,
  :host(:not([variant]):not([type])) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-blackberry-600);
  }

  :host([variant='filled'][type='info']) .badge,
  :host(:not([variant])[type='info']) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-blueberry-600);
  }

  :host([variant='filled'][type='success']) .badge,
  :host(:not([variant])[type='success']) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-kale-600);
  }

  :host([variant='filled'][type='warning']) .badge,
  :host(:not([variant])[type='warning']) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-pineapple-600);
  }

  :host([variant='filled'][type='error']) .badge,
  :host(:not([variant])[type='error']) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-peach-600);
  }

  :host([variant='filled'][type='highlight']) .badge,
  :host(:not([variant])[type='highlight']) .badge {
    color: var(--cds-color-foreground-high-contrast);
    background: var(--cds-color-palette-violet-600);
  }

  /* outlined + type */
  :host([variant='outlined'][type='neutral']) .badge,
  :host([variant='outlined']:not([type])) .badge {
    border: 1px solid var(--cds-color-palette-blackberry-700);
    color: var(--cds-color-palette-blackberry-700);
  }

  :host([variant='outlined'][type='info']) .badge {
    border: 1px solid var(--cds-color-palette-blueberry-700);
    color: var(--cds-color-palette-blueberry-700);
  }

  :host([variant='outlined'][type='success']) .badge {
    border: 1px solid var(--cds-color-palette-kale-700);
    color: var(--cds-color-palette-kale-700);
  }

  :host([variant='outlined'][type='warning']) .badge {
    border: 1px solid var(--cds-color-palette-pineapple-700);
    color: var(--cds-color-palette-pineapple-700);
  }

  :host([variant='outlined'][type='error']) .badge {
    border: 1px solid var(--cds-color-palette-peach-700);
    color: var(--cds-color-palette-peach-700);
  }

  :host([variant='outlined'][type='highlight']) .badge {
    border: 1px solid var(--cds-color-palette-violet-600);
    color: var(--cds-color-palette-violet-600);
  }

  /* light + type */
  :host([variant='light'][type='neutral']) .badge,
  :host([variant='light']:not([type])) .badge {
    background: var(--cds-color-palette-blackberry-100);
    color: var(--cds-color-palette-blackberry-600);
  }

  :host([variant='light'][type='info']) .badge {
    background: var(--cds-color-palette-blueberry-200);
    color: var(--cds-color-palette-blueberry-700);
  }

  :host([variant='light'][type='success']) .badge {
    background: var(--cds-color-palette-kale-200);
    color: var(--cds-color-palette-kale-700);
  }

  :host([variant='light'][type='warning']) .badge {
    background: var(--cds-color-palette-pineapple-200);
    color: var(--cds-color-palette-pineapple-700);
  }

  :host([variant='light'][type='error']) .badge {
    background: var(--cds-color-palette-peach-200);
    color: var(--cds-color-palette-peach-700);
  }

  :host([variant='light'][type='highlight']) .badge {
    background: var(--cds-color-palette-violet-200);
    color: var(--cds-color-palette-violet-700);
  }

  /* Slots */
  .icon {
    display: inline-flex;
    align-items: center;
  }

  .text {
    display: inline-flex;
    align-items: center;
  }

  slot[name='icon']:not(:slotted(*)) {
    display: none;
  }
`;

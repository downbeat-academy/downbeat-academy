import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-flex;
    width: fit-content;
    height: fit-content;
  }

  :host([full-width]) {
    width: 100%;
  }

  .button {
    align-items: center;
    border-radius: var(--cds-radii-medium);
    display: inline-flex;
    flex-direction: row;
    font-family: var(--cds-typography-font-family-productive-body);
    transition: var(--cds-transition-02);
    justify-content: center;
    text-decoration: none;
    width: 100%;
    height: fit-content;
    cursor: pointer;
    box-sizing: border-box;
  }

  /* Focus ring */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--cds-focus-ring-width) solid var(--cds-focus-ring-color-standard);
    outline-offset: var(--cds-focus-ring-offset);
  }

  /* Sizes */
  :host([size='x-small']) .button {
    padding: 4px 10px;
    font-size: var(--cds-typography-font-size-fixed-productive-x-small);
  }

  :host([size='small']) .button {
    padding: 6px 16px;
    font-size: var(--cds-typography-font-size-fixed-productive-small);
  }

  :host([size='medium']) .button,
  :host(:not([size])) .button {
    padding: 8px 20px;
    font-size: var(--cds-typography-font-size-fixed-productive-base);
  }

  :host([size='large']) .button {
    padding: 9px 24px;
    font-size: var(--cds-typography-font-size-fixed-productive-large);
  }

  /* Primary variant */
  :host([variant='primary']) .button,
  :host(:not([variant])) .button {
    border: none;
    background: var(--cds-color-palette-blueberry-600);
    color: var(--cds-color-foreground-high-contrast);
  }

  :host([variant='primary']) .button:hover,
  :host(:not([variant])) .button:hover {
    background: var(--cds-color-palette-blueberry-700);
  }

  :host([variant='primary']) .button:active,
  :host(:not([variant])) .button:active {
    background: var(--cds-color-palette-blueberry-700);
  }

  /* Secondary variant */
  :host([variant='secondary']) .button {
    background: transparent;
    border-width: 1px;
    border-color: var(--cds-color-border-primary);
    border-style: solid;
    color: var(--cds-color-foreground-primary);
  }

  :host([variant='secondary']) .button:hover {
    background: var(--cds-color-palette-blackberry-100);
  }

  :host([variant='secondary']) .button:active {
    background: var(--cds-color-palette-blackberry-200);
  }

  /* Ghost variant */
  :host([variant='ghost']) .button {
    border: none;
    background: transparent;
    color: var(--cds-color-palette-blueberry-500);
  }

  :host([variant='ghost']) .button:hover {
    background: var(--cds-color-palette-blueberry-200);
    color: var(--cds-color-palette-blueberry-600);
  }

  :host([variant='ghost']) .button:active {
    background: var(--cds-color-palette-blueberry-300);
    color: var(--cds-color-palette-blueberry-700);
  }

  /* Destructive variant */
  :host([variant='destructive']) .button {
    border: none;
    background: var(--cds-color-palette-peach-600);
    color: var(--cds-color-foreground-high-contrast);
  }

  :host([variant='destructive']) .button:hover {
    background: var(--cds-color-palette-peach-700);
  }

  :host([variant='destructive']) .button:active {
    background: var(--cds-color-palette-peach-700);
  }

  :host([variant='destructive']) .button:focus-visible {
    outline: var(--cds-focus-ring-width) solid var(--cds-focus-ring-color-critical);
    outline-offset: var(--cds-focus-ring-offset);
  }

  /* Disabled */
  :host([disabled]) .button {
    color: var(--cds-color-palette-blackberry-400);
    background: var(--cds-color-palette-blackberry-200);
    cursor: not-allowed;
    border: none;
  }

  :host([disabled]) .button:hover {
    color: var(--cds-color-palette-blackberry-400);
    background: var(--cds-color-palette-blackberry-200);
  }

  :host([disabled]) .button:active {
    color: var(--cds-color-palette-blackberry-400);
    background: var(--cds-color-palette-blackberry-200);
  }

  /* Icon container */
  .icon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: currentColor;
  }

  /* Label */
  .label {
    display: inline-flex;
    align-items: center;
  }

  /* Icon spacing for buttons with text */
  .button:not(.icon-only) .icon-container + .label {
    margin-left: var(--cds-scale-x-small);
  }

  .button:not(.icon-only) .label + .icon-container {
    margin-left: var(--cds-scale-x-small);
  }

  /* Icon-only */
  .button.icon-only {
    aspect-ratio: 1;
  }

  :host([size='x-small']) .button.icon-only {
    padding: 4px;
  }

  :host([size='small']) .button.icon-only {
    padding: 6px;
  }

  :host([size='medium']) .button.icon-only,
  :host(:not([size])) .button.icon-only {
    padding: 8px;
  }

  :host([size='large']) .button.icon-only {
    padding: 9px;
  }

  /* Icon sizing per button size */
  :host([size='x-small']) ::slotted([slot='icon']) {
    width: 12px;
    height: 12px;
  }

  :host([size='small']) ::slotted([slot='icon']) {
    width: 14px;
    height: 14px;
  }

  :host([size='medium']) ::slotted([slot='icon']),
  :host(:not([size])) ::slotted([slot='icon']) {
    width: 16px;
    height: 16px;
  }

  :host([size='large']) ::slotted([slot='icon']) {
    width: 20px;
    height: 20px;
  }
`;

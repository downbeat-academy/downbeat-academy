import { css } from 'lit';

export const textStyles = css`
  :host {
    display: block;
  }

  .text {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }

  /* Type: productive-body */
  :host([type='productive-body']) .text,
  :host(:not([type])) .text {
    font-family: var(--cds-typography-font-family-productive-body);
    line-height: var(--cds-typography-line-height-productive-body);
  }

  /* Type: productive-headline */
  :host([type='productive-headline']) .text {
    font-family: var(--cds-typography-font-family-productive-headline);
    line-height: var(--cds-typography-line-height-productive-headline);
  }

  /* Type: expressive-body */
  :host([type='expressive-body']) .text {
    font-family: var(--cds-typography-font-family-expressive-body);
    line-height: var(--cds-typography-line-height-expressive-body);
  }

  /* Type: expressive-headline */
  :host([type='expressive-headline']) .text {
    font-family: var(--cds-typography-font-family-expressive-headline);
    line-height: var(--cds-typography-line-height-expressive-headline);
  }

  /* Productive headline sizes */
  :host([type='productive-headline'][size='h1']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-4x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-4x-large);
  }

  :host([type='productive-headline'][size='h2']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-3x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-3x-large);
  }

  :host([type='productive-headline'][size='h3']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-2x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-2x-large);
  }

  :host([type='productive-headline'][size='h4']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-x-large);
  }

  :host([type='productive-headline'][size='h5']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-large);
  }

  :host([type='productive-headline'][size='h6']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-base);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-base);
  }

  /* Productive body sizes */
  :host([type='productive-body'][size='body-large']),
  :host(:not([type])[size='body-large']) {
    font-size: var(--cds-typography-font-size-fixed-productive-large);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-large);
  }

  :host([type='productive-body'][size='body-base']) .text,
  :host(:not([type])[size='body-base']) .text,
  :host(:not([type]):not([size])) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-base);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-base);
  }

  :host([type='productive-body'][size='body-small']) .text,
  :host(:not([type])[size='body-small']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-small);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-small);
  }

  :host([type='productive-body'][size='body-x-small']) .text,
  :host(:not([type])[size='body-x-small']) .text {
    font-size: var(--cds-typography-font-size-fixed-productive-x-small);
    margin-bottom: var(--cds-typography-font-size-fixed-productive-x-small);
  }

  /* Expressive headline sizes */
  :host([type='expressive-headline'][size='mega']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-6x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-6x-large);
  }

  :host([type='expressive-headline'][size='h1']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-5x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-5x-large);
  }

  :host([type='expressive-headline'][size='h2']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-4x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-4x-large);
  }

  :host([type='expressive-headline'][size='h3']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-3x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-3x-large);
  }

  :host([type='expressive-headline'][size='h4']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-2x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-2x-large);
  }

  :host([type='expressive-headline'][size='h5']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-x-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-x-large);
  }

  :host([type='expressive-headline'][size='h6']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-large);
  }

  /* Expressive body sizes */
  :host([type='expressive-body'][size='body-large']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-large);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-large);
  }

  :host([type='expressive-body'][size='body-base']) .text,
  :host([type='expressive-body']:not([size])) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-base);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-base);
  }

  :host([type='expressive-body'][size='body-small']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-small);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-small);
  }

  :host([type='expressive-body'][size='body-x-small']) .text {
    font-size: var(--cds-typography-font-size-fixed-expressive-x-small);
    margin-bottom: var(--cds-typography-font-size-fixed-expressive-x-small);
  }

  /* Colors */
  :host([color='primary']) .text,
  :host(:not([color])) .text {
    color: var(--cds-color-foreground-primary);
  }

  :host([color='strong']) .text {
    color: var(--cds-color-foreground-strong);
  }

  :host([color='faint']) .text {
    color: var(--cds-color-foreground-faint);
  }

  :host([color='disabled']) .text {
    color: var(--cds-color-foreground-disabled);
  }

  :host([color='high-contrast']) .text {
    color: var(--cds-color-foreground-high-contrast);
  }

  :host([color='warning']) .text {
    color: var(--cds-color-foreground-warning-default);
  }

  :host([color='critical']) .text {
    color: var(--cds-color-foreground-critical-default);
  }

  :host([color='interactive']) .text {
    color: var(--cds-color-foreground-interactive-default);
  }

  :host([color='brand']) .text {
    color: var(--cds-color-foreground-brand-default);
  }

  :host([color='success']) .text {
    color: var(--cds-color-foreground-success-default);
  }

  /* Backgrounds */
  :host([background='primary']) .text {
    background: var(--cds-color-surface-primary);
  }

  :host([background='faint']) .text {
    background: var(--cds-color-surface-faint);
  }

  :host([background='high-contrast']) .text {
    background: var(--cds-color-surface-high-contrast);
  }

  :host([background='brand']) .text {
    background: var(--cds-color-surface-brand);
  }

  :host([background='interactive']) .text {
    background: var(--cds-color-surface-interactive);
  }

  :host([background='success']) .text {
    background: var(--cds-color-surface-success);
  }

  :host([background='warning']) .text {
    background: var(--cds-color-surface-warning);
  }

  :host([background='critical']) .text {
    background: var(--cds-color-surface-critical);
  }

  /* Alignment */
  :host([align='left']) .text,
  :host(:not([align])) .text {
    text-align: left;
  }

  :host([align='center']) .text {
    text-align: center;
  }

  :host([align='right']) .text {
    text-align: right;
  }

  :host([align='justify']) .text {
    text-align: justify;
  }

  /* Collapse */
  :host([collapse]) .text {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

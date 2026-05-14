import { css } from 'lit';

export const sectionContainerStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    border-radius: var(--cds-radii-soft);
    outline-width: 1px;
    outline-style: solid;
    overflow: hidden;
    /* Default border color */
    outline-color: var(--cds-color-border-primary);
  }

  /* Background */
  :host([background='primary']) {
    background: var(--cds-color-surface-primary);
  }

  :host([background='faint']) {
    background: var(--cds-color-surface-faint);
  }

  :host([background='high-contrast']) {
    background: var(--cds-color-surface-high-contrast);
  }

  :host([background='brand']) {
    background: var(--cds-color-surface-brand);
  }

  :host([background='interactive']) {
    background: var(--cds-color-surface-interactive);
  }

  :host([background='success']) {
    background: var(--cds-color-surface-success);
  }

  :host([background='warning']) {
    background: var(--cds-color-surface-warning);
  }

  :host([background='critical']) {
    background: var(--cds-color-surface-critical);
  }

  /* Border color */
  :host(:not([border-color])),
  :host([border-color='primary']) {
    outline-color: var(--cds-color-border-primary);
  }

  :host([border-color='faint']) {
    outline-color: var(--cds-color-border-faint);
  }

  :host([border-color='brand']) {
    outline-color: var(--cds-color-border-brand);
  }

  :host([border-color='interactive']) {
    outline-color: var(--cds-color-border-interactive);
  }

  :host([border-color='success']) {
    outline-color: var(--cds-color-border-success);
  }

  :host([border-color='warning']) {
    outline-color: var(--cds-color-border-warning);
  }

  :host([border-color='critical']) {
    outline-color: var(--cds-color-border-critical);
  }

  :host([border-color='high-contrast']) {
    outline-color: var(--cds-color-border-high-contrast);
  }
`;

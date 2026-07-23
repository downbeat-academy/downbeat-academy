import { css } from 'lit';

export const sectionTitleStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    padding: var(--cds-scale-x-large);
    gap: var(--cds-scale-small);
  }

  /* Border */
  :host([has-border]) {
    border-bottom: 1px solid var(--cds-color-border-primary);
  }

  /* Alignment */
  :host(:not([alignment])) ::slotted(*),
  :host([alignment='left']) ::slotted(*) {
    text-align: left;
  }

  :host([alignment='center']) ::slotted(*) {
    text-align: center;
  }

  :host([alignment='right']) ::slotted(*) {
    text-align: right;
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
`;

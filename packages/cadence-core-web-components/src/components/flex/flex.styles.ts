import { css } from 'lit';

export const flexStyles = css`
  :host {
    display: flex;
  }

  /* Direction */
  :host(:not([direction])),
  :host([direction='column']) {
    flex-direction: column;
  }

  :host([direction='row']) {
    flex-direction: row;
  }

  /* Wrap */
  :host([wrap]) {
    flex-wrap: wrap;
  }

  /* Gap */
  :host(:not([gap])),
  :host([gap='none']) {
    gap: 0;
  }

  :host([gap='2x-small']) {
    gap: var(--cds-scale-2x-small);
  }

  :host([gap='x-small']) {
    gap: var(--cds-scale-x-small);
  }

  :host([gap='small']) {
    gap: var(--cds-scale-small);
  }

  :host([gap='medium']) {
    gap: var(--cds-scale-base);
  }

  :host([gap='large']) {
    gap: var(--cds-scale-large);
  }

  :host([gap='x-large']) {
    gap: var(--cds-scale-x-large);
  }

  :host([gap='2x-large']) {
    gap: var(--cds-scale-2x-large);
  }

  :host([gap='3x-large']) {
    gap: var(--cds-scale-3x-large);
  }

  /* Padding */
  :host(:not([padding])),
  :host([padding='none']) {
    padding: 0;
  }

  :host([padding='2x-small']) {
    padding: var(--cds-scale-2x-small);
  }

  :host([padding='x-small']) {
    padding: var(--cds-scale-x-small);
  }

  :host([padding='small']) {
    padding: var(--cds-scale-small);
  }

  :host([padding='medium']) {
    padding: var(--cds-scale-base);
  }

  :host([padding='large']) {
    padding: var(--cds-scale-large);
  }

  :host([padding='x-large']) {
    padding: var(--cds-scale-x-large);
  }

  :host([padding='2x-large']) {
    padding: var(--cds-scale-2x-large);
  }

  :host([padding='3x-large']) {
    padding: var(--cds-scale-3x-large);
  }

  /* Align items */
  :host([align-items='stretch']) {
    align-items: stretch;
  }

  :host([align-items='start']) {
    align-items: start;
  }

  :host([align-items='center']) {
    align-items: center;
  }

  :host([align-items='end']) {
    align-items: end;
  }

  /* Align content */
  :host([align-content='stretch']) {
    align-content: stretch;
  }

  :host([align-content='start']) {
    align-content: start;
  }

  :host([align-content='center']) {
    align-content: center;
  }

  :host([align-content='end']) {
    align-content: end;
  }

  /* Justify content */
  :host([justify-content='start']) {
    justify-content: start;
  }

  :host([justify-content='center']) {
    justify-content: center;
  }

  :host([justify-content='end']) {
    justify-content: end;
  }

  :host([justify-content='space-between']) {
    justify-content: space-between;
  }

  :host([justify-content='space-around']) {
    justify-content: space-around;
  }

  :host([justify-content='space-evenly']) {
    justify-content: space-evenly;
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

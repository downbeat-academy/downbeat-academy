import { css } from 'lit';

export const summaryStyles = css`
  :host {
    display: block;
  }

  details {
    overflow: hidden;
  }

  details:focus {
    outline: var(--cds-focus-ring-width) solid var(--cds-focus-ring-color-standard);
    outline-offset: var(--cds-focus-ring-offset);
  }

  /* Type: contained */
  :host(:not([type])) details,
  :host([type='contained']) details {
    border: 1px solid var(--cds-color-border-primary);
    border-radius: var(--cds-radii-soft);
  }

  /* Type: flush */
  :host([type='flush']) details {
    border-bottom: 1px solid var(--cds-color-palette-blackberry-300);
  }

  /* Title */
  summary {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--cds-scale-x-small);
    background: var(--cds-color-surface-primary);
    transition: background 0.1s ease-in-out;
    cursor: pointer;
    list-style: none;
  }

  summary:hover {
    background: var(--cds-color-palette-blackberry-100);
  }

  summary::marker {
    content: '';
  }

  summary::-webkit-details-marker {
    display: none;
  }

  /* Content */
  .content {
    display: flex;
    flex-direction: column;
    gap: var(--cds-scale-base);
    background: var(--cds-color-surface-primary);
  }

  /* Size */
  :host(:not([size])) summary,
  :host(:not([size])) .content,
  :host([size='medium']) summary,
  :host([size='medium']) .content {
    padding: var(--cds-scale-base);
  }

  :host([size='small']) summary,
  :host([size='small']) .content {
    padding: var(--cds-scale-small);
  }

  :host([size='large']) summary,
  :host([size='large']) .content {
    padding: var(--cds-scale-large);
  }

  /* Icon */
  .icon {
    flex-shrink: 0;
    transition: transform 0.15s ease-in-out;
  }

  details[open] .icon {
    transform: rotate(90deg);
  }
`;

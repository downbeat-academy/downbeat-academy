import { css } from 'lit';

export const blockquoteStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--cds-scale-large);
    background: var(--cds-color-palette-blueberry-50);
    padding: var(--cds-scale-2x-large);
    border: 1px solid var(--cds-color-border-interactive);
    border-radius: var(--cds-radii-soft);
    margin: var(--cds-scale-2x-large) 0;
    color: var(--cds-color-palette-blueberry-700);
  }

  :host([collapse]) {
    margin: 0;
  }

  ::slotted(*),
  .attribution,
  .quote {
    color: var(--cds-color-palette-blueberry-700);
  }

  em {
    font-style: italic;
  }
`;

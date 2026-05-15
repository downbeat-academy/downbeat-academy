import { css } from 'lit';

export const linkStyles = css`
  :host {
    display: inline;
  }

  .link {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-decoration: none;
    transition: var(--cds-transition-02);
    cursor: pointer;
  }

  /* Types */
  :host([type='primary']) .link,
  :host(:not([type])) .link {
    color: var(--cds-color-foreground-interactive-default);
  }

  :host([type='primary']) .link:hover,
  :host(:not([type])) .link:hover {
    color: var(--cds-color-foreground-interactive-hover);
  }

  :host([type='primary']) .link:active,
  :host(:not([type])) .link:active {
    color: var(--cds-color-foreground-interactive-active);
  }

  :host([type='secondary']) .link {
    color: var(--cds-color-palette-blackberry-700);
  }

  :host([type='secondary']) .link:hover {
    color: var(--cds-color-palette-blackberry-800);
  }

  :host([type='secondary']) .link:active {
    color: var(--cds-color-palette-blackberry-800);
  }

  :host([type='brand']) .link {
    color: var(--cds-color-foreground-brand-default);
  }

  :host([type='brand']) .link:hover {
    color: var(--cds-color-foreground-brand-hover);
  }

  :host([type='brand']) .link:active {
    color: var(--cds-color-foreground-brand-active);
  }

  :host([type='inherit']) .link {
    color: inherit;
  }

  /* Underline: on by default, removed when no-underline attribute is present */
  .link {
    text-decoration: underline;
  }

  :host([no-underline]) .link {
    text-decoration: none;
  }

  /* Focus */
  .link:focus {
    outline: none;
  }

  .link:focus-visible {
    outline: var(--cds-focus-ring-width) solid var(--cds-focus-ring-color-standard);
    outline-offset: var(--cds-focus-ring-offset);
    border-radius: 2px;
  }
`;

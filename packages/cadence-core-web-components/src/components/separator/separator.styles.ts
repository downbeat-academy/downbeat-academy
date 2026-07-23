import { css } from 'lit';

export const separatorStyles = css`
  :host {
    display: block;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
  }

  .separator {
    border: none;
    margin: 0;
    padding: 0;
  }

  /* Orientation */
  :host(:not([orientation])) .separator,
  :host([orientation='horizontal']) .separator {
    height: 1px;
    width: 100%;
  }

  :host([orientation='vertical']) .separator {
    height: 100%;
    min-height: 100%;
    width: 1px;
  }

  /* Colors */
  :host(:not([color])) .separator,
  :host([color='primary']) .separator {
    background: var(--cds-color-border-primary);
  }

  :host([color='faint']) .separator {
    background: var(--cds-color-border-faint);
  }

  :host([color='brand']) .separator {
    background: var(--cds-color-border-brand);
  }

  :host([color='interactive']) .separator {
    background: var(--cds-color-border-interactive);
  }

  :host([color='success']) .separator {
    background: var(--cds-color-border-success);
  }

  :host([color='warning']) .separator {
    background: var(--cds-color-border-warning);
  }

  :host([color='critical']) .separator {
    background: var(--cds-color-border-critical);
  }

  :host([color='high-contrast']) .separator {
    background: var(--cds-color-border-high-contrast);
  }
`;

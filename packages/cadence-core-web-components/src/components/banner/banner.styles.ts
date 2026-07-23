import { css } from 'lit';

export const bannerStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--cds-scale-base);
    background: var(--cds-color-surface-high-contrast);
    color: var(--cds-color-foreground-high-contrast);
    padding: var(--cds-scale-x-small) var(--cds-scale-x-large);
  }

  @media (max-width: 600px) {
    :host {
      flex-direction: column;
    }
  }

  /* Type variants — placeholder hooks to match cadence-core */
  :host([type='primary']) {
  }

  :host([type='secondary']) {
  }

  :host([type='tertiary']) {
  }
`;

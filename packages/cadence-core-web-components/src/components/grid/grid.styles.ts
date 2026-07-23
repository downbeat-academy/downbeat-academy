import { css } from 'lit';

export const gridStyles = css`
  :host {
    display: grid;
    grid-auto-rows: 1fr;
    align-items: stretch;
  }

  /* Auto-responsive columns using the same minmax pattern as cadence-core */
  :host([columns='1']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 1), 1fr));
  }

  :host([columns='2']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 2), 1fr));
  }

  :host([columns='3']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 3), 1fr));
  }

  :host([columns='4']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 4), 1fr));
  }

  :host([columns='5']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 5), 1fr));
  }

  :host([columns='6']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 6), 1fr));
  }

  :host([columns='7']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 7), 1fr));
  }

  :host([columns='8']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 8), 1fr));
  }

  :host([columns='9']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 9), 1fr));
  }

  :host([columns='10']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 10), 1fr));
  }

  :host([columns='11']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 11), 1fr));
  }

  :host([columns='12']) {
    grid-template-columns: repeat(auto-fit, minmax(calc(1200px / 12), 1fr));
  }
`;

export const gridItemStyles = css`
  :host {
    display: block;
  }

  /* Column span */
  :host([span='1'])  { grid-column: span 1; }
  :host([span='2'])  { grid-column: span 2; }
  :host([span='3'])  { grid-column: span 3; }
  :host([span='4'])  { grid-column: span 4; }
  :host([span='5'])  { grid-column: span 5; }
  :host([span='6'])  { grid-column: span 6; }
  :host([span='7'])  { grid-column: span 7; }
  :host([span='8'])  { grid-column: span 8; }
  :host([span='9'])  { grid-column: span 9; }
  :host([span='10']) { grid-column: span 10; }
  :host([span='11']) { grid-column: span 11; }
  :host([span='12']) { grid-column: span 12; }

  /* Row span */
  :host([row-span='1'])  { grid-row: span 1; }
  :host([row-span='2'])  { grid-row: span 2; }
  :host([row-span='3'])  { grid-row: span 3; }
  :host([row-span='4'])  { grid-row: span 4; }
  :host([row-span='5'])  { grid-row: span 5; }
  :host([row-span='6'])  { grid-row: span 6; }
`;

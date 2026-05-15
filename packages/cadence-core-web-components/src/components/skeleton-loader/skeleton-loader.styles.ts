import { css } from 'lit';

export const skeletonLoaderStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  :host([inline]) {
    display: inline-flex;
    flex-wrap: wrap;
    width: auto;
  }

  .skeleton-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  :host([inline]) .skeleton-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;
  }

  .skeleton {
    display: block;
    background-color: var(--cds-color-palette-blueberry-200);
    border-radius: var(--cds-radii-medium);
    position: relative;
    overflow: hidden;
    /* width/height/border-radius set via inline style from host attributes */
  }

  :host([circle]) .skeleton {
    border-radius: 50%;
  }

  /* Shimmer animation */
  @keyframes shimmer-ltr {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes shimmer-rtl {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--cds-color-palette-blueberry-100) 50%,
      transparent 100%
    );
    animation: shimmer-ltr var(--_skeleton-duration, 1.5s) ease-in-out infinite;
  }

  :host([direction='rtl']) .skeleton::after {
    animation-name: shimmer-rtl;
  }

  :host([no-animation]) .skeleton::after {
    animation: none;
  }
`;

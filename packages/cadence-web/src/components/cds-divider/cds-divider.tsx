import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-divider',
  styleUrl: 'cds-divider.css',
  shadow: true,
})
export class CdsDivider {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

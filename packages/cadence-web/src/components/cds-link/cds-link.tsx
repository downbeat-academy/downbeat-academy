import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-link',
  styleUrl: 'cds-link.css',
  shadow: true,
})
export class CdsLink {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

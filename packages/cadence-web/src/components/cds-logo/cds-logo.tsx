import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-logo',
  styleUrl: 'cds-logo.css',
  shadow: true,
})
export class CdsLogo {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

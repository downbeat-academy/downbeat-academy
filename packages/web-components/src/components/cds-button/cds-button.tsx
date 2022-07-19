import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-button',
  styleUrl: 'cds-button.css',
  shadow: true,
})
export class CdsButton {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

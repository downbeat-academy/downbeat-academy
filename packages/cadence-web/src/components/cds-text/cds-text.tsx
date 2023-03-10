import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-text',
  styleUrl: 'cds-text.css',
  shadow: true,
})
export class CdsText {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

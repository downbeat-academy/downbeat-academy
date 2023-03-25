import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-body-text',
  styleUrl: 'cds-body-text.css',
  shadow: true,
})
export class CdsBodyText {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

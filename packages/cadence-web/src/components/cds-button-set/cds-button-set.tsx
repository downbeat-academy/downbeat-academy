import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-button-set',
  styleUrl: 'cds-button-set.css',
  shadow: true,
})
export class CdsButtonSet {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

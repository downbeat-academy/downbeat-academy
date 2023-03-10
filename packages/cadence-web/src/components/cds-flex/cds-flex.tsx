import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-flex',
  styleUrl: 'cds-flex.css',
  shadow: true,
})
export class CdsFlex {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

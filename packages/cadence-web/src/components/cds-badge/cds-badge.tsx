import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.css',
  shadow: true,
})
export class CdsBadge {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

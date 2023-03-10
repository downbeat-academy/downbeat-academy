import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-avatar',
  styleUrl: 'cds-avatar.css',
  shadow: true,
})
export class CdsAvatar {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

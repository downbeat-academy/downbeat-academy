import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cds-avatar-group',
  styleUrl: 'cds-avatar-group.css',
  shadow: true,
})
export class CdsAvatarGroup {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

import { Component, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-avatar-group',
  styleUrl: 'cds-avatar-group.css',
  shadow: true,
})
export class CdsAvatarGroup {
  @Prop() avatars!: any[];
  @Prop() overlap?: 'compact' | 'medium' | 'comfortable'
  @Prop() direction?: 'horizontal' | 'vertical';
  @Prop() isInteractive?: boolean;
  @Prop() gap?: 'small' | 'medium' | 'large';

  render() {

    const classes = classNames(
      'cds-avatar-group',
      this.direction ? `direction--${this.direction}` : `direction--horizontal`,
      {
        'is-interactive': this.isInteractive,
        [`overlap--${this.overlap}`]: this.overlap,
        [`gap--${this.gap}`]: this.gap,
      }
    )

    return (
      <Host>
        <div class={classes}>
          <slot />
        </div>
      </Host>
    );
  }

}

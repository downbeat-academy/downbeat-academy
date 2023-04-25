import { Component, h, Host, Prop } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.scss',
  shadow: true,
})

export class CdsBadge {
  @Prop() text!: string;
  @Prop() type: 'neutral' | 'informational' | 'caution' | 'critical' | 'positive';
  @Prop() badgeStyle: 'fill' | 'outline' | 'inverse';
  @Prop() size: 'small' | 'medium' | 'large';
  @Prop() iconPosition: 'leading' | 'trailing';

  render() {

    const classes = classnames(
      `cds-badge`,
      this.type ? `type--${this.type}` : `type--neutral`,
      this.size ? `size--${this.size}` : `size--medium`,
      this.badgeStyle ? `badge-style--${this.badgeStyle}` : `badge-style--fill`,
    )

    return (
      <Host>
        <span class={classes}>{this.text}</span>
      </Host>
    );
  }
}

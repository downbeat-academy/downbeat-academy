import { Component, h, Prop } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.css',
  shadow: true,
})

export class CdsBadge {
  @Prop() text!: string;
  @Prop() type: 'neutral' | 'positive' | 'informational' | 'warning' | 'critical';
  @Prop() badgeStyle: 'fill' | 'outline' | 'inverse';
  @Prop() size: 'default' | 'small' | 'large';
  @Prop() iconPosition: 'leading' | 'trailing';

  render() {

    const classes = classnames(
      `badge`,
      this.type ? `type--${this.type}` : `type--neutral`,
      this.size ? `size--${this.size}` : `size--default`,
      this.badgeStyle ? `badgeStyle--${this.badgeStyle}` : `badgeStyle--fill`,
    )

    return (
      <span class={classes}>{this.text}</span>
    );
  }
}

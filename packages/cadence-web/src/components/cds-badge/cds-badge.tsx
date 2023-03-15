import { Component, h, Prop } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.css',
  shadow: true,
})

export class CdsBadge {
  @Prop() text: string;
  @Prop() type: 'neutral' | 'informational' | 'positive' | 'warning' | 'critical';
  @Prop() badgeStyle: 'fill' | 'outline' | 'inverse';
  @Prop() size: 'small' | 'default' | 'large';
  @Prop() iconPosition: 'leading' | 'trailing';

  render() {

    const classes = classnames(
      `badge`,
      `type--${this.type}`,
      `size--${this.size}`,
      `badgeStyle--${this.badgeStyle}`,
    )

    return (
      <span class={classes}>{this.text}</span>
    );
  }
}

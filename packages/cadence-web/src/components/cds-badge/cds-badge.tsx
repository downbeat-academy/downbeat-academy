import { Component, h, Host, Prop } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.css',
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
      `cds-badge-root`,
      {
        [`type--${this.type}`]: this.type,
        [`size--${this.size}`]: this.size,
        [`badge-style--${this.badgeStyle}`]: this.badgeStyle,
      }
    )

    return (
      <Host>
        <span class={classes}>{this.text}</span>
      </Host>
    );
  }
}

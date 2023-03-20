import { Component, h, Host, Prop } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-badge',
  styleUrl: 'cds-badge.css',
  shadow: true,
})

export class CdsBadge {
  @Prop() text!: string;
  @Prop() type: 'neutral';
  @Prop() badgeStyle: 'fill';
  @Prop() size: 'medium';
  @Prop() iconPosition: string;

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

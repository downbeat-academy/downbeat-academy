import { Component, h, Prop } from '@stencil/core';
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
  @Prop() size: 'default';
  @Prop() iconPosition: string;

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

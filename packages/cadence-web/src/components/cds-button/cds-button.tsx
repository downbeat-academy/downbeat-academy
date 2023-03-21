import { Component, Prop, Host, h } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-button',
  styleUrl: 'cds-button.css',
  shadow: true,
})
export class CdsButton {
  @Prop() text: string;
  @Prop() icon: string;
  @Prop() iconPosition: 'leading' | 'trailing';
  @Prop() isFullWidth: boolean;
  @Prop() size: 'large' | 'medium' | 'small' | 'x-small';
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';

  render() {
    const classes = classnames(
      `cds-button`,
      this.variant ? `variant--${this.variant}` : `variant--primary`,
      this.size ? `size--${this.size}` : `size--medium`,
      {
        'isFullWidth': this.isFullWidth,
      },
    )
    return (
      <Host>
        <button class={classes}>
          {this.text}
        </button>
      </Host>
    );
  }
}

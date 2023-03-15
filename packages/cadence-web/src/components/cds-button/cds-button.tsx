import { Component, Prop, h } from '@stencil/core';
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
  @Prop() size: 'large' | 'default' | 'small' | 'x-small';
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';

  render() {
    const classes = classnames(
      `root`,
      this.variant ? `variant--${this.variant}` : `variant--primary`,
      this.size ? `size--${this.size}` : `size--default`,
      this.isFullWidth ? `isFullWidth` : null,
    )
    return (
      <button class={classes}>
        {this.text}
      </button>
    );
  }
}

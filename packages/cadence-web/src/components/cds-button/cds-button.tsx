import { Component, Prop, h } from '@stencil/core';

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
    return (
      <button>
        {this.text}
      </button>
    );
  }
}

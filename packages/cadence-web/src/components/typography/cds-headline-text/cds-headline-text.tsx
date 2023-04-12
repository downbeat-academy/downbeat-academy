import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-headline-text',
  styleUrl: 'cds-headline-text.css',
  shadow: true,
})
export class CdsHeadlineText {
  @Prop() tag!: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  @Prop() type: 'expressive' | 'productive'
  @Prop() size:
    | '6x-large'
    | '5x-large'
    | '4x-large'
    | '3x-large'
    | '2x-large'
    | 'x-large'
    | 'large'
    | 'base'
    | 'small'
    | 'x-small';
  @Prop() color:
    | 'primary'
    | 'interactive'
    | 'brand'
    | 'strong'
    | 'secondary'
    | 'disabled'
    | 'high-contrast'
    | 'success'
    | 'caution'
    | 'critical'
  @Prop() fluid?: boolean;
  @Prop() collapse?: boolean;
  @Prop() align?: 'left' | 'center' | 'right';
  @Prop() customClass?: string;

  render() {
    const classes = classNames(
      'cds-headline-text',
      this.type ? `type--${this.type}` : 'type--productive',
      this.size ? `size--${this.size}` : 'size--base',
      this.color ? `color--${this.color}` : 'color--primary',
      this.align ? `align--${this.align}` : 'align--left',
      {
        'fluid': this.fluid,
        'collapse': this.collapse,
      }
    )

    switch (this.tag) {
      case 'h1': return <h1 class={classes}><slot /></h1>
      case 'h2': return <h2 class={classes}><slot /></h2>
      case 'h3': return <h3 class={classes}><slot /></h3>
      case 'h4': return <h4 class={classes}><slot /></h4>
      case 'h5': return <h5 class={classes}><slot /></h5>
      case 'h6': return <h6 class={classes}><slot /></h6>
      default: return console.error('The headline tex component must have a tag property.')
    }
  }
}

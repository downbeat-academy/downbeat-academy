import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-body-text',
  styleUrl: 'cds-body-text.css',
  shadow: true,
})
export class CdsBodyText {
  @Prop() tag!:
    | 'p'
    | 'span'
    | 'caption'
    | 'code'
    | 'cite'
    | 'pre'
    | 'sup'
    | 'sub'
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
      'cds-body-text',
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
      case 'p': return <p class={classes}><slot /></p>
      case 'span': return <span class={classes}><slot /></span>
      case 'caption': return <caption class={classes}><slot /></caption>
      case 'code': return <code class={classes}><slot /></code>
      case 'cite': return <cite class={classes}><slot /></cite>
      case 'sup': return <sup class={classes}><slot /></sup>
      case 'sub': return <sub class={classes}><slot /></sub>
      case 'pre': return <pre class={classes}><slot /></pre>
    }
  }

}

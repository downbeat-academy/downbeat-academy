import { Component, Prop, h } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-divider',
  styleUrl: 'cds-divider.css',
  shadow: true,
})
export class CdsDivider {

  @Prop() width: 'small' | 'medium' | 'large' | 'full-width';
  @Prop() color: 'primary' | 'secondary' | 'high-contrast' | 'brand' | 'interactive';
  @Prop() thickness: 'small' | 'large';
  @Prop() align: 'left' | 'center' | 'right';
  @Prop() spacing: 'none' | 'small' | 'medium' | 'large';

  render() {

    const classes = classnames(
      `cds-divider`,
      this.width ? `width--${this.width}` : `width--medium`,
      this.color ? `color--${this.color}` : `color--primary`,
      this.thickness ? `thickness--${this.thickness}` : `thickness--small`,
      this.align ? `align--${this.align}` : `align--left`,
      this.spacing ? `spacing--${this.spacing}` : `spacing--medium`,
    )

    return (
      <hr class={classes} />
    );
  }

}

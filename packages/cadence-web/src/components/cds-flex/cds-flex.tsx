import { Component, Prop, Host, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-flex',
  styleUrl: 'cds-flex.css',
  shadow: true,
})
export class CdsFlex {

  @Prop() direction!: 'row' | 'column';
  @Prop() gap?:
    | '2x-small'
    | 'x-small'
    | 'small'
    | 'base'
    | 'large'
    | 'x-large'
    | '2x-large'
    | '3x-large'
    | '4x-large'
    | '5x-large';
  @Prop() padding?: 'medium';
  @Prop() background?:
    | 'primary'
    | 'secondary'
    | 'brand'
    | 'interactive'
    | 'positive'
    | 'info'
    | 'caution'
    | 'critical'
    | 'inverse';
  @Prop() borderRadius?:
    | 'default'
    | 'soft'
    | 'medium'
    | 'hard'
    | 'rounded';
  @Prop() borderColor?:
    | 'default'
    | 'caution'
    | 'critical'
    | 'interactive'
    | 'info';
  @Prop() justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  @Prop() align?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'baseline';
  @Prop() textAlign?: 'left' | 'center' | 'right';
  @Prop() wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';

  render() {

    const classes = classNames(
      'cds-flex-root',
      {
        [`direction--${this.direction}`]: this.direction,
        [`gap--${this.gap}`]: this.gap,
        [`padding--${this.padding}`]: this.padding,
        [`background--${this.background}`]: this.background,
        [`border-radius--${this.borderRadius}`]: this.borderRadius,
        [`border-color--${this.borderColor}`]: this.borderColor,
        [`justify--${this.justify}`]: this.justify,
        [`align--${this.align}`]: this.align,
        [`text-align--${this.textAlign}`]: this.textAlign,
        [`wrap--${this.wrap}`]: this.wrap,
      },
    )

    return (
      <Host>
        <div class={classes}>
          <slot></slot>
        </div>
      </Host >
    );
  }
}

import { Component, Prop, Host, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-flex',
  styleUrl: 'cds-flex.css',
  shadow: true,
})
export class CdsFlex {

  @Prop() direction: 'row';
  @Prop() gap: 'base';
  @Prop() padding: 'medium';
  @Prop() background: 'primary';
  @Prop() borderRadius?: string;
  @Prop() borderColor?: string;
  @Prop() justify?: string;
  @Prop() align?: string;
  @Prop() textAlign?: 'left';
  @Prop() wrap?: 'nowrap';

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

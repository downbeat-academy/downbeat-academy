import { Component, Prop, Host, h } from '@stencil/core';
import classnames from 'classnames'

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

    const classes = classnames(
      'root',
      this.direction && `direction--${this.direction}`,
      this.gap && `gap--${this.gap}`,
      this.padding && `padding--${this.padding}`,
      this.background && `background--${this.background}`,
      this.borderRadius && `border-radius--${this.borderRadius}`,
      this.borderColor && `border-color--${this.borderColor}`,
      this.justify && `justify--${this.justify}`,
      this.align && `align--${this.align}`,
      this.textAlign && `text-align--${this.textAlign}`,
      this.wrap && `wrap--${this.wrap}`,
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

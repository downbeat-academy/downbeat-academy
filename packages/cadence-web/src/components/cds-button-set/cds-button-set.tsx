import { Component, Prop, Host, h } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-button-set',
  styleUrl: 'cds-button-set.css',
  shadow: true,
})
export class CdsButtonSet {
  @Prop() direction: 'row' | 'column';
  @Prop() justify: 'start' | 'end' | 'space-between';
  @Prop() gap: 'none' | 'x-small' | 'small' | 'default' | 'large';


  render() {

    const classes = classnames(
      'button-set',
      this.direction ? `direction--${this.direction}` : `direction--row`,
      this.justify ? `justify--${this.justify}` : `justify--start`,
      this.gap ? `gap--${this.gap}` : `gap--medium`,
    )

    return (
      <Host>
        <div class={classes}>
          <slot />
        </div>
      </Host>
    );
  }
}

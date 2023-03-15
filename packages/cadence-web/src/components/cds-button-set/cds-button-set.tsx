import { Component, Prop, h } from '@stencil/core';
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
      'buttonSet',
      this.direction ? `direction--${this.direction}` : `direction--row`,
      this.justify ? `justify--${this.justify}` : `justify--start`,
      this.gap ? `gap--${this.gap}` : `gap--default`,
    )

    return (
      <div class={classes}>
        <slot />
      </div>
    );
  }

}

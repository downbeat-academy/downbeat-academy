import { Component, Prop, h } from '@stencil/core';
import classnames from 'classnames'

@Component({
  tag: 'cds-link',
  styleUrl: 'cds-link.css',
  shadow: true,
})

export class CdsLink {

  @Prop() text: string;
  @Prop() type: 'primary' | 'secondary';
  @Prop() href: string;
  @Prop() target: '_self' | '_blank';

  render() {

    const classes = classnames(
      `cds-link`,
      `type--${this.type}`,
    )

    return (
      <a href={this.href} target={this.target} class={classes}>{this.text}</a>
    );
  }

}

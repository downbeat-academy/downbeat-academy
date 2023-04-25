import { Component, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'cds-avatar',
  styleUrl: 'cds-avatar.scss',
  shadow: true,
})
export class CdsAvatar {

  @Prop() size!: 'small' | 'medium' | 'large';
  @Prop() imageObject?: any;
  @Prop() imageUrl?: string;
  @Prop() name?: string;
  @Prop() rounded?: boolean;
  @Prop() hasBorder?: boolean;

  render() {

    const classes = classNames(
      'cds-avatar',
      this.size ? `size--${this.size}` : `size--medium`,
      {
        'rounded': this.rounded,
        'has-border': this.hasBorder,
      }
    )

    const getSize = (size: string) => {
      switch (size) {
        case 'small': return 40;
        case 'medium': return 64;
        case 'large': return 80;
      }
    }

    const baType = 'marble'
    const baColors = '6b75f6,43a2ff,b10010,4ccad1'
    const baName = this.name !== undefined ? encodeURI(this.name) : 'username';

    return (
      <Host>
        <div class={classes}>
          {this.imageObject === undefined && this.imageUrl === undefined ? (
            <img src={`https://source.boringavatars.com/${baType}/${getSize(this.size)}/${baName}?colors=${baColors}`} alt={this.name} />
          ) : this.imageObject !== undefined && this.imageUrl === undefined ? (
            this.imageObject
          ) : this.imageObject === undefined && this.imageUrl !== undefined ? (
            <img src={this.imageUrl} alt={this.name} />
          ) : console.error('Invalid image property for the avatar.')}
        </div>
      </Host>
    );
  }

}

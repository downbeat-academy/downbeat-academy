import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'cds-badge',
    styleUrl: 'cds-badge.scss',
    shadow: true,
})
export class CdsBadge {
    @Prop() text!: string;
    @Prop() type: string;
    @Prop() size: string;
    @Prop() variant: string;
    @Prop() withText = true;
    @Prop() withIcon: boolean;

    render() {
        return (
            <span
                class={`
        cds-badge
        cds-badge--type-${this.type || 'neutral'}
        cds-badge--size-${this.size || 'default'}
        cds-badge--variant-${this.variant || 'filled'}`}
            >
                {this.withText ? this.text : null}
            </span>
        );
    }
}

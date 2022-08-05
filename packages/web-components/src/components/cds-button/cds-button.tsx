import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'cds-button',
    styleUrl: 'cds-button.scss',
    shadow: true,
})
export class CdsButton {
    @Prop() text!: string;
    @Prop() size: string;
    @Prop() variant: string;
    @Prop() customClass: string;

    render() {
        return (
            <button
                class={`
        cds_button 
        cds_button--variant-${this.variant || 'primary'} 
        cds_button--size-${this.size || 'default'}`}
            >
                {this.text || 'Button text'}
            </button>
        );
    }
}

/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CdsAvatar {
    }
    interface CdsAvatarGroup {
    }
    interface CdsBadge {
        "badgeStyle": 'fill' | 'outline' | 'inverse';
        "iconPosition": 'leading' | 'trailing';
        "size": 'default' | 'small' | 'large';
        "text": string;
        "type": 'neutral' | 'positive' | 'informational' | 'warning' | 'critical';
    }
    interface CdsButton {
        "icon": string;
        "iconPosition": 'leading' | 'trailing';
        "isFullWidth": boolean;
        "size": 'large' | 'default' | 'small' | 'x-small';
        "text": string;
        "variant": 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
    }
    interface CdsButtonSet {
        "direction": 'row' | 'column';
        "gap": 'none' | 'x-small' | 'small' | 'default' | 'large';
        "justify": 'start' | 'end' | 'space-between';
    }
    interface CdsDivider {
    }
    interface CdsFlex {
    }
    interface CdsLink {
    }
    interface CdsLogo {
    }
    interface CdsText {
    }
}
declare global {
    interface HTMLCdsAvatarElement extends Components.CdsAvatar, HTMLStencilElement {
    }
    var HTMLCdsAvatarElement: {
        prototype: HTMLCdsAvatarElement;
        new (): HTMLCdsAvatarElement;
    };
    interface HTMLCdsAvatarGroupElement extends Components.CdsAvatarGroup, HTMLStencilElement {
    }
    var HTMLCdsAvatarGroupElement: {
        prototype: HTMLCdsAvatarGroupElement;
        new (): HTMLCdsAvatarGroupElement;
    };
    interface HTMLCdsBadgeElement extends Components.CdsBadge, HTMLStencilElement {
    }
    var HTMLCdsBadgeElement: {
        prototype: HTMLCdsBadgeElement;
        new (): HTMLCdsBadgeElement;
    };
    interface HTMLCdsButtonElement extends Components.CdsButton, HTMLStencilElement {
    }
    var HTMLCdsButtonElement: {
        prototype: HTMLCdsButtonElement;
        new (): HTMLCdsButtonElement;
    };
    interface HTMLCdsButtonSetElement extends Components.CdsButtonSet, HTMLStencilElement {
    }
    var HTMLCdsButtonSetElement: {
        prototype: HTMLCdsButtonSetElement;
        new (): HTMLCdsButtonSetElement;
    };
    interface HTMLCdsDividerElement extends Components.CdsDivider, HTMLStencilElement {
    }
    var HTMLCdsDividerElement: {
        prototype: HTMLCdsDividerElement;
        new (): HTMLCdsDividerElement;
    };
    interface HTMLCdsFlexElement extends Components.CdsFlex, HTMLStencilElement {
    }
    var HTMLCdsFlexElement: {
        prototype: HTMLCdsFlexElement;
        new (): HTMLCdsFlexElement;
    };
    interface HTMLCdsLinkElement extends Components.CdsLink, HTMLStencilElement {
    }
    var HTMLCdsLinkElement: {
        prototype: HTMLCdsLinkElement;
        new (): HTMLCdsLinkElement;
    };
    interface HTMLCdsLogoElement extends Components.CdsLogo, HTMLStencilElement {
    }
    var HTMLCdsLogoElement: {
        prototype: HTMLCdsLogoElement;
        new (): HTMLCdsLogoElement;
    };
    interface HTMLCdsTextElement extends Components.CdsText, HTMLStencilElement {
    }
    var HTMLCdsTextElement: {
        prototype: HTMLCdsTextElement;
        new (): HTMLCdsTextElement;
    };
    interface HTMLElementTagNameMap {
        "cds-avatar": HTMLCdsAvatarElement;
        "cds-avatar-group": HTMLCdsAvatarGroupElement;
        "cds-badge": HTMLCdsBadgeElement;
        "cds-button": HTMLCdsButtonElement;
        "cds-button-set": HTMLCdsButtonSetElement;
        "cds-divider": HTMLCdsDividerElement;
        "cds-flex": HTMLCdsFlexElement;
        "cds-link": HTMLCdsLinkElement;
        "cds-logo": HTMLCdsLogoElement;
        "cds-text": HTMLCdsTextElement;
    }
}
declare namespace LocalJSX {
    interface CdsAvatar {
    }
    interface CdsAvatarGroup {
    }
    interface CdsBadge {
        "badgeStyle"?: 'fill' | 'outline' | 'inverse';
        "iconPosition"?: 'leading' | 'trailing';
        "size"?: 'default' | 'small' | 'large';
        "text": string;
        "type"?: 'neutral' | 'positive' | 'informational' | 'warning' | 'critical';
    }
    interface CdsButton {
        "icon"?: string;
        "iconPosition"?: 'leading' | 'trailing';
        "isFullWidth"?: boolean;
        "size"?: 'large' | 'default' | 'small' | 'x-small';
        "text"?: string;
        "variant"?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
    }
    interface CdsButtonSet {
        "direction"?: 'row' | 'column';
        "gap"?: 'none' | 'x-small' | 'small' | 'default' | 'large';
        "justify"?: 'start' | 'end' | 'space-between';
    }
    interface CdsDivider {
    }
    interface CdsFlex {
    }
    interface CdsLink {
    }
    interface CdsLogo {
    }
    interface CdsText {
    }
    interface IntrinsicElements {
        "cds-avatar": CdsAvatar;
        "cds-avatar-group": CdsAvatarGroup;
        "cds-badge": CdsBadge;
        "cds-button": CdsButton;
        "cds-button-set": CdsButtonSet;
        "cds-divider": CdsDivider;
        "cds-flex": CdsFlex;
        "cds-link": CdsLink;
        "cds-logo": CdsLogo;
        "cds-text": CdsText;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cds-avatar": LocalJSX.CdsAvatar & JSXBase.HTMLAttributes<HTMLCdsAvatarElement>;
            "cds-avatar-group": LocalJSX.CdsAvatarGroup & JSXBase.HTMLAttributes<HTMLCdsAvatarGroupElement>;
            "cds-badge": LocalJSX.CdsBadge & JSXBase.HTMLAttributes<HTMLCdsBadgeElement>;
            "cds-button": LocalJSX.CdsButton & JSXBase.HTMLAttributes<HTMLCdsButtonElement>;
            "cds-button-set": LocalJSX.CdsButtonSet & JSXBase.HTMLAttributes<HTMLCdsButtonSetElement>;
            "cds-divider": LocalJSX.CdsDivider & JSXBase.HTMLAttributes<HTMLCdsDividerElement>;
            "cds-flex": LocalJSX.CdsFlex & JSXBase.HTMLAttributes<HTMLCdsFlexElement>;
            "cds-link": LocalJSX.CdsLink & JSXBase.HTMLAttributes<HTMLCdsLinkElement>;
            "cds-logo": LocalJSX.CdsLogo & JSXBase.HTMLAttributes<HTMLCdsLogoElement>;
            "cds-text": LocalJSX.CdsText & JSXBase.HTMLAttributes<HTMLCdsTextElement>;
        }
    }
}
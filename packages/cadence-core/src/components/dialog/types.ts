import type {
	ModalCloseProps,
	ModalDescriptionProps,
	ModalRootProps,
	ModalSurfaceProps,
	ModalTitleProps,
	ModalTriggerProps,
} from '../modal'
import React from 'react'

export interface DialogProps extends ModalRootProps {}
export interface DialogContentProps extends Omit<ModalSurfaceProps, 'closeClassName'> {}
export interface DialogTriggerProps extends ModalTriggerProps {}
export interface DialogCloseProps extends ModalCloseProps {}
export interface DialogTitleProps extends ModalTitleProps {}
export interface DialogDescriptionProps extends ModalDescriptionProps {}

export interface DialogHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {}

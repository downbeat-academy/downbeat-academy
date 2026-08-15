import type {
	ModalCloseProps,
	ModalDescriptionProps,
	ModalRootProps,
	ModalSurfaceProps,
	ModalTitleProps,
	ModalTriggerProps,
} from '../modal'
import React from 'react'

export type DrawerSide = 'right' | 'left'

export interface DrawerProps extends ModalRootProps {}

export interface DrawerContentProps
	extends Omit<ModalSurfaceProps, 'closeClassName'> {
	/** Which edge the drawer is pinned to. Defaults to `'right'`. */
	side?: DrawerSide
}

export interface DrawerTriggerProps extends ModalTriggerProps {}
export interface DrawerCloseProps extends ModalCloseProps {}
export interface DrawerTitleProps extends ModalTitleProps {}
export interface DrawerDescriptionProps extends ModalDescriptionProps {}

export interface DrawerHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {}

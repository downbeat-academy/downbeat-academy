/**
 * Internal machinery shared by `Dialog` and `Drawer`.
 *
 * Deliberately absent from the package barrel — like `src/test-utils` and `slot/`, this
 * is a building block rather than public API. `Dialog` and `Drawer` are the supported
 * surfaces; a consumer wanting a third modal shape should get one added here rather than
 * assembling it themselves.
 */
export { ModalRoot } from './modal-root'
export { ModalSurface } from './modal-surface'
export {
	ModalTrigger,
	ModalClose,
	ModalTitle,
	ModalDescription,
} from './modal-parts'
export { ModalContext, useModalContext } from './modal-context'
export type {
	ModalRootProps,
	ModalSurfaceProps,
	ModalTriggerProps,
	ModalCloseProps,
	ModalTitleProps,
	ModalDescriptionProps,
} from './types'

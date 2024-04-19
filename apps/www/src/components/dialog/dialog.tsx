'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DialogOverlay } from './primitives/overlay'
import { DialogContent } from './primitives/content'
import { DialogHeader } from './primitives/header'
import { DialogFooter } from './primitives/footer'
import { DialogTitle } from './primitives/title'
import { DialogDescription } from './primitives/description'
import { DialogClose } from './primitives/close'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal

export {
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
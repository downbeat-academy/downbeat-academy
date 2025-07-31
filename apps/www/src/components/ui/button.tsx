import React from 'react'
import NextLink from 'next/link'
import { Button as CadenceButton, ButtonWrapper as CadenceButtonWrapper } from 'cadence-core'
import type { ButtonProps as CadenceButtonProps, ButtonWrapperProps } from 'cadence-core'

export type ButtonProps = CadenceButtonProps

export const Button = (props: ButtonProps) => {
  return <CadenceButton {...props} linkComponent={NextLink} />
}

export const ButtonWrapper = CadenceButtonWrapper

export type { ButtonWrapperProps }
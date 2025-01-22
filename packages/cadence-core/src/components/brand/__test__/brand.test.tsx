import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  LogoLockup,
  LogoSymbol,
  LogoText
} from '../index'

describe('Logo components', () => {
  it('LogoLockup should render correctly', () => {
    render(<LogoLockup />)
    const logoLockup = screen.getByTestId('logo-lockup')
    expect(logoLockup).toBeInstanceOf(HTMLElement)
  });
  it('LogoSymbol should render correctly', () => {
    render(<LogoSymbol />)
    const logoSymbol = screen.getByTestId('logo-symbol')
    expect(logoSymbol).toBeInstanceOf(HTMLElement)
  })
  it('LogoText should render correctly', () => {
    render(<LogoText />)
    const logoText = screen.getByTestId('logo-text')
    expect(logoText).toBeInstanceOf(HTMLElement)
  })
})
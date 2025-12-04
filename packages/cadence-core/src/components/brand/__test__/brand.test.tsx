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
    const { container } = render(<LogoLockup />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInstanceOf(HTMLElement)
  });
  it('LogoSymbol should render correctly', () => {
    const { container } = render(<LogoSymbol />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInstanceOf(HTMLElement)
  })
  it('LogoText should render correctly', () => {
    const { container } = render(<LogoText />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInstanceOf(HTMLElement)
  })
})
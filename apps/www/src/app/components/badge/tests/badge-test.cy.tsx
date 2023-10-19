import React from 'react'
import { Badge } from '@components/badge'

describe('<Badge />', () => {
  it('mounts', () => {
    cy.mount(<Badge text='Badge text' />)
  })

  it('badge has valid text value', () => {
    cy.mount(<Badge text='Badge with text' />)
    cy.get('[data-cy=text]').should('have.text', 'Badge with text')
  })

  it('badge renders different sizes', () => {
    cy.mount(<Badge text='Small badge' size='small' />)
    cy.get('[data-cy=badge]').should('have.class', 'badge_small')
  })
})
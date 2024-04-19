import React from 'react'
import { Badge } from 'components/badge'

describe('<Badge />', () => {

  // General

  it('it mounts', () => {
    cy.mount(<Badge text='Badge text' />)
  })

  it('it has valid text value', () => {
    cy.mount(<Badge text='Badge with text' />)
    cy.get('[data-cy=text]').should('have.text', 'Badge with text')
  })

  // Size

  it('it should render medium size if no size argument is passed', () => {
    cy.mount(<Badge text='Badge with no size' />)
    cy.get('[data-cy=cds-badge]').should(($mediumBadge) => {
      const className = $mediumBadge[0].className
      expect(className).to.match(/badge_medium__/)
    })
  })

  it('it should render the correct CSS class if the size argument is provided', () => {
    cy.mount(<Badge text='Small badge' size='small' />)
    cy.get('[data-cy=cds-badge]')
      .should(($smallBadge) => {
        const className = $smallBadge[0].className
        expect(className).to.match(/badge_small__/)
      })
  })

  // Type

  it('it should render the neutral type if no type argument is passed', () => {
    cy.mount(<Badge text='Neutral badge' />)
    cy.get('[data-cy=cds-badge]')
      .should(($neutralBadge) => {
        const className = $neutralBadge[0].className
        expect(className).to.match(/badge_filled--neutral__/)
      })
  })

  it('it should render the correct CSS class if the type argument is passed', () => {
    cy.mount(<Badge text='Critical badge' type='error' />)
    cy.get('[data-cy=cds-badge]')
      .should(($errorBadge) => {
        const className = $errorBadge[0].className
        expect(className).to.match(/badge_filled--error__/)
      })
  })

  // Style

  it('it should render the filled badge if no style argument is passed', () => {
    cy.mount(<Badge text='Filled badge' />)
    cy.get('[data-cy=cds-badge]')
      .should(($filledBadge) => {
        const className = $filledBadge[0].className
        expect(className).to.match(/badge_filled--/)
      })
  })

  it('it should render the correct CSS class if the style argument is passed', () => {
    cy.mount(<Badge text='Outlined badge' style='outlined' />)
    cy.get('[data-cy=cds-badge]')
      .should(($outlinedBadge) => {
        const className = $outlinedBadge[0].className
        expect(className).to.match(/badge_outlined--/)
      })
  })

  // Custom class

  it('it should render a custom CSS class if the argument is provided', () => {
    cy.mount(<Badge text='Custom badge' className='custom-class' />)
    cy.get('[data-cy=cds-badge]')
      .should('have.class', 'custom-class')
  })

  // A11y
})
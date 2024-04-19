import React from 'react'
import { Button } from '@components/button'

describe('<Button />', () => {

  // General tests

  it('it mounts', () => {
    cy.mount(<Button text='Button text' />)
  })

  it('it should render a valid text value', () => {
    cy.mount(<Button text='Button with text' />)
    cy.get('[data-cy=cds-button]').should('have.text', 'Button with text')
  })

  // Type / variant

  it('it should render the primary variant if not variant argument is passed', () => {
    cy.mount(<Button text='Primary button' />)
    cy.get('[data-cy=cds-button]').should(($primaryButton) => {
      const className = $primaryButton[0].className
      expect(className).to.match(/button_primary/)
    })
  })

  it('it should render the correct CSS class if the variant argument is provided', () => {
    cy.mount(
      <>
        <Button text='Secondary button' variant='secondary' />
        <Button text='Ghost button' variant='ghost' />
        <Button text='Destructive button' variant='destructive' />
      </>
    )
    cy.get('[data-cy=cds-button]').should(($secondaryButton) => {
      const className = $secondaryButton[0].className
      expect(className).to.match(/button_secondary/)
    })
    cy.get('[data-cy=cds-button]').should(($ghostButton) => {
      const className = $ghostButton[1].className
      expect(className).to.match(/button_ghost/)
    })
    cy.get('[data-cy=cds-button]').should(($destructiveButton) => {
      const className = $destructiveButton[2].className
      expect(className).to.match(/button_destructive/)
    })
  })

  // Size
  it('it should render the medium size if no size argument is passed', () => {
    cy.mount(<Button text='Medium button' />)
    cy.get('[data-cy=cds-button]').should(($mediumButton) => {
      const className = $mediumButton[0].className
      expect(className).to.match(/button_medium/)
    })
  })

  it('it should render the correct CSS class if the size argument is passed', () => {
    cy.mount(
      <>
        <Button text='Extra small button' size='x-small' />
        <Button text='Small button' size='small' />
        <Button text='Medium button' size='medium' />
        <Button text='Large button' size='large' />
      </>
    )
    cy.get('[data-cy=cds-button]')
      .should(($extraSmallButton) => {
        const className = $extraSmallButton[0].className
        expect(className).to.match(/button_x-small/)
      })
      .should(($smallButton) => {
        const className = $smallButton[1].className
        expect(className).to.match(/button_small/)
      })
      .should(($mediumButton) => {
        const className = $mediumButton[2].className
        expect(className).to.match(/button_medium/)
      })
      .should(($largeButton) => {
        const className = $largeButton[3].className
        expect(className).to.match(/button_large/)
      })
  })

  // Full width
  it('it should render the correct CSS class if the isFullWidth argument is passed', () => {
    cy.mount(<Button text='Full width button' isFullWidth />)
    cy.get('[data-cy=cds-button]').should(($fullWidthButton) => {
      const className = $fullWidthButton[0].className
      expect(className).to.match(/button_is-full-width/)
    })
  })

  // Links
  it('it should render a link if an href is passed', () => {
    cy.mount(<Button text='External link' href='https://google.com' />)
    cy.get('[data-cy=cds-button]').should('have.attr', 'href', 'https://google.com')
  })

  it('it should render an internal link if the isLinkInternal argument is passed', () => {
    cy.mount(<Button text='Internal link' href='/about' isLinkInternal />)
    cy.get('[data-cy=cds-button]').should('have.attr', 'href', '/about')
  })

  // Custom class
  it('it should render a custom CSS class if the argument is provided', () => {
    cy.mount(<Button text='Custom button' className='custom-class' />)
    cy.get('[data-cy=cds-button]').should('have.class', 'custom-class')
  })
})
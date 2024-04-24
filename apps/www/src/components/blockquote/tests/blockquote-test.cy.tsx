import React from 'react'
import { Blockquote } from '@components/blockquote'

describe('<Blockquote />', () => {
	// General

	it('it mounts', () => {
		cy.mount(<Blockquote />)
	})

	it('it has a valid quote value', () => {
		cy.mount(<Blockquote quote="Quote text" />)
		cy.get('[data-cy=cds-blockquote-quote]').should('have.text', 'Quote text')
	})

	it('it has a valid attribution value', () => {
		cy.mount(<Blockquote attribution="Quote author" />)
		cy.get('[data-cy=cds-blockquote-attribution]').should(
			'have.text',
			'– Quote author'
		)
	})

	it('it should render attribution with a link if the argument is passed', () => {
		cy.mount(
			<Blockquote
				attribution="Quote author"
				link="https://downbeatacademy.com"
			/>
		)
		cy.get('[data-cy=cds-blockquote-attribution] > a').should('exist')
	})
})

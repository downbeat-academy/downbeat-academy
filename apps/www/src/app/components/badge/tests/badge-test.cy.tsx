import React from 'react'
import { Badge } from '@components/badge'

describe('<Badge />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Badge text='Badge text' />)
  })
})
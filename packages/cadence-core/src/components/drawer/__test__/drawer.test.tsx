import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from '../drawer'
import { DrawerContent } from '../drawer-content'
import { DrawerTrigger } from '../drawer-trigger'
import { DrawerTitle } from '../drawer-title'
import { DrawerDescription } from '../drawer-description'
import { DrawerHeader } from '../drawer-header'
import { DrawerBody } from '../drawer-body'

describe('Drawer', () => {
  it('should render the trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.getByText('Open')).toBeInstanceOf(HTMLElement)
  })

  it('should open drawer on trigger click', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>Description text</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Body content</DrawerBody>
        </DrawerContent>
      </Drawer>
    )
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Drawer Title')).toBeInstanceOf(HTMLElement)
    expect(screen.getByText('Body content')).toBeInstanceOf(HTMLElement)
  })

  it('should not show content when closed', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Hidden Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.queryByText('Hidden Title')).toBeNull()
  })
})

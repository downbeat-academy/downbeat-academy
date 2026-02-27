import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from '../drawer'
import { DrawerContent } from '../drawer-content'
import { DrawerTrigger } from '../drawer-trigger'
import { DrawerHeader } from '../drawer-header'
import { DrawerBody } from '../drawer-body'
import { DrawerFooter } from '../drawer-footer'
import { DrawerTitle } from '../drawer-title'
import { DrawerDescription } from '../drawer-description'
import { Button } from '../../button'

const meta: Meta<typeof Drawer> = {
  title: 'Cadence/Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>This is the main body content of the drawer. It scrolls if the content is long enough.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button>Action</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const LeftSide: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Left Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the left side.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Content goes here.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithScrollableContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Scrollable Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Scrollable Content</DrawerTitle>
          <DrawerDescription>
            This drawer has enough content to require scrolling.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
}

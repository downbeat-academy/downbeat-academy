import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../'

const meta: Meta<typeof Table> = {
  title: 'Cadence/Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: ['none', 'primary'],
      description: 'Background color of the table wrapper',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer' },
]

const products = [
  { name: 'Widget A', price: 29.99, quantity: 100 },
  { name: 'Widget B', price: 49.99, quantity: 50 },
  { name: 'Widget C', price: 19.99, quantity: 200 },
]

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithAlignment: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead alignment="start">Product</TableHead>
          <TableHead alignment="center">Quantity</TableHead>
          <TableHead alignment="end">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell alignment="start">{product.name}</TableCell>
            <TableCell alignment="center">{product.quantity}</TableCell>
            <TableCell alignment="end">${product.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the alignment prop on TableHead and TableCell components. Options are "start", "center", and "end".',
      },
    },
  },
}

export const WithCaption: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>User account information and roles</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TableCaption provides an accessible description of the table content. This is important for screen reader users to understand the table purpose.',
      },
    },
  },
}

export const WithHeader: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The isHeader prop on TableRow applies header-specific styling to distinguish header rows from data rows.',
      },
    },
  },
}

export const Responsive: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px', border: '1px dashed #ccc', padding: '8px' }}>
      <Table {...args}>
        <TableHeader>
          <TableRow isHeader>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>2024-01-15</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tables automatically support horizontal scrolling when the content exceeds the container width. The dashed border shows the constrained container.',
      },
    },
  },
}

export const WithFooter: Story = {
  render: (args) => {
    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0)

    return (
      <Table {...args}>
        <TableHeader>
          <TableRow isHeader>
            <TableHead alignment="start">Product</TableHead>
            <TableHead alignment="center">Quantity</TableHead>
            <TableHead alignment="end">Price</TableHead>
            <TableHead alignment="end">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell alignment="start">{product.name}</TableCell>
              <TableCell alignment="center">{product.quantity}</TableCell>
              <TableCell alignment="end">${product.price.toFixed(2)}</TableCell>
              <TableCell alignment="end">
                ${(product.price * product.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell alignment="start">
              <strong>Total</strong>
            </TableCell>
            <TableCell alignment="center">
              <strong>{totalQuantity}</strong>
            </TableCell>
            <TableCell alignment="end">-</TableCell>
            <TableCell alignment="end">
              <strong>${total.toFixed(2)}</strong>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'TableFooter is used for summary rows like totals. This example shows a product inventory with calculated totals in the footer.',
      },
    },
  },
}

export const WithPrimaryBackground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  args: {
    backgroundColor: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The backgroundColor prop allows setting a background color on the table wrapper. Options are "none" (default) and "primary".',
      },
    },
  },
}

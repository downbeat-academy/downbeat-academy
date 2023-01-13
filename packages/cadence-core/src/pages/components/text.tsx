import { Text, Flex } from '../../components'

export default function TextPage() {
  return (
    <Flex direction='column' gap='medium'>
      <Flex direction='column'>
        <Text tag='p' type='expressive' collapse>Expressive</Text>
        <Text tag='h1' type='expressive' size='6x-large' collapse>6x-large</Text>
        <Text tag='h2' type='expressive' size='5x-large' collapse>5x-large</Text>
        <Text tag='h3' type='expressive' size='4x-large' collapse>4x-large</Text>
        <Text tag='h4' type='expressive' size='3x-large' collapse>3x-large</Text>
        <Text tag='h5' type='expressive' size='2x-large' collapse>2x-large</Text>
        <Text tag='h6' type='expressive' size='x-large' collapse>x-large</Text>
        <Text tag='h6' type='expressive' size='large' collapse>large</Text>
        <Text tag='h6' type='expressive' size='base' collapse>base</Text>
        <Text tag='h6' type='expressive' size='small' collapse>small</Text>
        <Text tag='h6' type='expressive' size='x-small' collapse>x-small</Text>
      </Flex>
      <Flex direction='column'>
        <Text tag='p' type='productive' collapse>Productive</Text>
        <Text tag='h3' type='productive' size='4x-large' collapse>4x-large</Text>
        <Text tag='h4' type='productive' size='3x-large' collapse>3x-large</Text>
        <Text tag='h5' type='productive' size='2x-large' collapse>2x-large</Text>
        <Text tag='h6' type='productive' size='x-large' collapse>x-large</Text>
        <Text tag='h6' type='productive' size='large' collapse>large</Text>
        <Text tag='h6' type='productive' size='base' collapse>base</Text>
        <Text tag='h6' type='productive' size='small' collapse>small</Text>
        <Text tag='h6' type='productive' size='x-small' collapse>x-small</Text>
      </Flex>
      <Flex direction='column'>
        <Text tag='p' type='productive' collapse>Color</Text>
        <Text tag='p' type='productive' color='primary' collapse>Primary</Text>
        <Text tag='p' type='productive' color='secondary' collapse>Secondary</Text>
        <Text tag='p' type='productive' color='brand' collapse>Brand</Text>
        <Text tag='p' type='productive' color='strong' collapse>Strong</Text>
        <Text tag='p' type='productive' color='interactive' collapse>Interactive</Text>
        <Text tag='p' type='productive' color='disabled' collapse>Disabled</Text>
        <Flex background='dark'>
          <Text tag='p' type='productive' color='high-contrast' collapse>High-contrast</Text>
        </Flex>
        <Text tag='p' type='productive' color='success' collapse>Success</Text>
        <Text tag='p' type='productive' color='caution' collapse>Caution</Text>
        <Text tag='p' type='productive' color='critical' collapse>Critical</Text>
      </Flex>
    </Flex>
  )
}
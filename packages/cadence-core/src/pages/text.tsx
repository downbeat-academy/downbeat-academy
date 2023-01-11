import { Text, Flex } from '../components'

export default function TextPage() {
  return (
    <Flex direction='column' gap='medium'>
      <Flex direction='column'>
        <Text tag='p' type='expressive' fontType='expressive-body' collapse>Expressive</Text>
        <Text tag='h1' type='expressive' fontType='expressive-headline' size='6x-large' collapse>6x-large</Text>
        <Text tag='h2' type='expressive' fontType='expressive-headline' size='5x-large' collapse>5x-large</Text>
        <Text tag='h3' type='expressive' fontType='expressive-headline' size='4x-large' collapse>4x-large</Text>
        <Text tag='h4' type='expressive' fontType='expressive-headline' size='3x-large' collapse>3x-large</Text>
        <Text tag='h5' type='expressive' fontType='expressive-headline' size='2x-large' collapse>2x-large</Text>
        <Text tag='h6' type='expressive' fontType='expressive-headline' size='x-large' collapse>x-large</Text>
        <Text tag='h6' type='expressive' fontType='expressive-body' size='large' collapse>large</Text>
        <Text tag='h6' type='expressive' fontType='expressive-body' size='base' collapse>base</Text>
        <Text tag='h6' type='expressive' fontType='expressive-body' size='small' collapse>small</Text>
        <Text tag='h6' type='expressive' fontType='expressive-body' size='x-small' collapse>x-small</Text>
      </Flex>
      <Flex direction='column'>
        <Text tag='p' type='productive' fontType='expressive-body' collapse>Productive</Text>
        <Text tag='h3' type='productive' fontType='productive-headline' size='4x-large' collapse>4x-large</Text>
        <Text tag='h4' type='productive' fontType='productive-headline' size='3x-large' collapse>3x-large</Text>
        <Text tag='h5' type='productive' fontType='productive-headline' size='2x-large' collapse>2x-large</Text>
        <Text tag='h6' type='productive' fontType='productive-headline' size='x-large' collapse>x-large</Text>
        <Text tag='h6' type='productive' fontType='productive-headline' size='large' collapse>large</Text>
        <Text tag='h6' type='productive' fontType='productive-headline' size='base' collapse>base</Text>
        <Text tag='h6' type='productive' fontType='productive-body' size='small' collapse>small</Text>
        <Text tag='h6' type='productive' fontType='productive-body' size='x-small' collapse>x-small</Text>
      </Flex>
    </Flex>
  )
}
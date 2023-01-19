import { Text, Flex } from '../../components'

export default function TextPage() {
  return (
    <Flex direction='column' gap='base'>
      <Flex direction='column' gap='base'>
        <Text
          tag='h1'
          type='expressive'
          size='6x-large'
          category='headline'
          collapse={true}
        >Expressive headline 1</Text>
        <Text
          tag='h2'
          type='expressive'
          size='5x-large'
          category='headline'
          collapse={true}
        >Expressive headline 2</Text>
        <Text
          tag='h3'
          type='expressive'
          size='4x-large'
          category='headline'
          collapse={true}
        >Expressive headline 3</Text>
        <Text
          tag='h4'
          type='expressive'
          size='3x-large'
          category='headline'
          collapse={true}
        >Expressive headline 4</Text>
        <Text
          tag='h5'
          type='expressive'
          size='2x-large'
          category='headline'
          collapse={true}
        >Expressive headline 5</Text>
        <Text
          tag='h6'
          type='expressive'
          size='x-large'
          category='headline'
          collapse={true}
        >Expressive headline 6</Text>
        <Text
          tag='p'
          type='expressive'
          size='large'
          category='body'
          collapse={true}
        >Expressive large body</Text>
        <Text
          tag='p'
          type='expressive'
          size='base'
          category='body'
          collapse={true}
        >Expressive base body</Text>
        <Text
          tag='p'
          type='expressive'
          size='small'
          category='body'
          collapse={true}
        >Expressive small body</Text>
        <Text
          tag='p'
          type='expressive'
          size='x-small'
          category='body'
          collapse={true}
        >Expressive extra small body</Text>
      </Flex>
      <Flex direction='column'>
        <Text tag='p' type='expressive' category='headline' size='base' collapse>Color</Text>
        <Text tag='p' type='productive' color='primary' size='base' category='body' collapse>Primary</Text>
        <Text tag='p' type='productive' color='secondary' size='base' category='body' collapse>Secondary</Text>
        <Text tag='p' type='productive' color='brand' size='base' category='body' collapse>Brand</Text>
        <Text tag='p' type='productive' color='strong' size='base' category='body' collapse>Strong</Text>
        <Text tag='p' type='productive' color='interactive' size='base' category='body' collapse>Interactive</Text>
        <Text tag='p' type='productive' color='disabled' size='base' category='body' collapse>Disabled</Text>
        <Flex background='dark'>
          <Text tag='p' type='productive' color='high-contrast' size='base' category='body' collapse>High-contrast</Text>
        </Flex>
        <Text tag='p' type='productive' color='success' size='base' category='body' collapse>Success</Text>
        <Text tag='p' type='productive' color='caution' size='base' category='body' collapse>Caution</Text>
        <Text tag='p' type='productive' color='critical' size='base' category='body' collapse>Critical</Text>
      </Flex>
    </Flex>
  )
}
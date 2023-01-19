import { Flex, Text, LogoSymbol, LogoLockup, LogoText } from '../../components'

export default function LogoPage() {
  return (
    <Flex direction='column' gap='base'>
      <Text tag='h1' category='headline' size='6x-large'>Logo</Text>
      <Flex direction='column' gap='large'>
        <Text tag='h2' category='headline' size='5x-large'>Types</Text>
        <LogoSymbol width={300} />
        <LogoText width={300} />
        <LogoLockup width={300} />
      </Flex>
      <Flex direction='column' gap='large'>
        <Text tag='h2' category='headline' size='5x-large'>Colors</Text>
        <LogoLockup color='brand' width={300} />
        <LogoLockup color='secondary' width={300} />
        <Flex background='dark'>
          <LogoLockup color='high-contrast' width={300} />
        </Flex>
      </Flex>
    </Flex>
  )
}
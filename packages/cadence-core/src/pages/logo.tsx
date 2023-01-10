import { Flex, Text, LogoSymbol, LogoLockup, LogoText } from '../components'

export default function LogoPage() {
  return (
    <Flex direction='column' gap='medium'>
      <Text tag='h1'>Logo</Text>
      <Flex direction='column' gap='large'>
        <Text tag='h2'>Types</Text>
        <LogoSymbol width={300} />
        <LogoText width={300} />
        <LogoLockup width={300} />
      </Flex>
      <Flex direction='column' gap='large'>
        <Text tag='h2'>Colors</Text>
        <LogoLockup color='brand' width={300} />
        <LogoLockup color='secondary' width={300} />
        <Flex background='dark'>
          <LogoLockup color='high-contrast' width={300} />
        </Flex>
      </Flex>
    </Flex>
  )
}
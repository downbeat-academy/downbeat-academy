import { redirect } from 'next/navigation'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Button, ButtonWrapper } from '@components/button'
import { Text } from '@components/text'
import { Form } from '@components/form'
import { Flex } from '@components/flex'
import { UpdateUserForm } from './update-user-form'
import { readUserSession } from '@actions/auth/read-user-session'
import { logout } from '@actions/auth/logout'

export default async function AccountPage() {

  const { data, error } = await readUserSession()

  if (error || !data?.user) {
    redirect('/login')
  }

  console.log(data.user)

  return (
    <SectionContainer>
      <SectionTitle
        title={
          <Text
            type='expressive-headline'
            size='h1'
            color='brand'
            collapse
          >Account</Text>
        }
        background='primary'
      />
      <Flex
        direction='column'
        gap='medium'
        padding='x-large'
      >
        <Text
          tag='p'
          type='expressive-body'
          size='body-base'
          color='primary'>
          We&apos;re working on new account features, check back soon to get the latest updates.
        </Text>
        {data.user.user_metadata.name && (
          <Text
            tag='p'
            type='expressive-body'
            size='body-base'
            color='primary'
          ><strong>Name:</strong> {data.user.user_metadata.name}</Text>
        )}
        <Text
          tag='p'
          type='expressive-body'
          size='body-base'
          color='primary'
        ><strong>Email:</strong> {data.user.email}</Text>
        <UpdateUserForm />
        <Form action={logout}>
          <ButtonWrapper>
            <Button variant='secondary' text='Log out' type='submit' />
          </ButtonWrapper>
        </Form>
      </Flex>
    </SectionContainer>
  )
}
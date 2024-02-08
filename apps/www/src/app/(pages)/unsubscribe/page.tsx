import { SectionContainer } from "@components/section-container";
import { SectionTitle } from "@components/section-title";
import { UnsubscribeForm } from "./unsubscribe-form";
import { Text } from "@components/text";

export default function UnsubscribePage() {
  return (
    <SectionContainer>
      <SectionTitle
        title={
          <Text
            tag='h1'
            type='expressive-headline'
            size='h1'
            color='brand'
            collapse
          >Unsubscribe</Text>
        }
        subtitle={
          <Text
            tag='p'
            type='expressive-body'
            size='body-base'
            color='primary'
            collapse
          >We&apos;re sorry to see you go. Please enter your email address to unsubscribe.</Text>
        }
        background='primary'
      />
      <UnsubscribeForm />
    </SectionContainer>
  )
}
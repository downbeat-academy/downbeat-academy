import { SectionContainer } from "components/section-container"
import { SectionTitle } from "components/section-title"
import { Text } from "components/text"
import { NewsletterSubscriptionForm } from "./newsletter-subscription-form"
import s from './newsletter-page.module.scss'

export default function NewsletterPage() {
  return (
    <SectionContainer>
      <SectionTitle
        title={
          <Text
            tag='h1'
            size='h1'
            type='expressive-headline'
            color='brand'
            collapse
          >
            Newsletter
          </Text>
        }
        subtitle={
          <Text
            tag='p'
            type='expressive-body'
            size='body-large'
            color='primary'
            collapse
          >
            Subscribe to get the latest resources and updates from Downbeat Academy.
          </Text>
        }
        background='primary'
      />
      <section className={s.wrapper}>
        <NewsletterSubscriptionForm />
      </section>
    </SectionContainer>
  )
}
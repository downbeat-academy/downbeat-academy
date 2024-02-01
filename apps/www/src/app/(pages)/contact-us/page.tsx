import { SectionContainer } from "@components/section-container"
import { SectionTitle } from "@components/section-title"
import { ContactForm } from "./contact-form"
import { Text } from "@components/text"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact us | Downbeat Academy',
  description: 'Get in touch with us at Downbeat Academy with any questions or comments.',
}

export default function ContactPage() {
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
          >Contact us</Text>
        } 
        background='primary'
      />
      <ContactForm />
    </SectionContainer>
  )
}
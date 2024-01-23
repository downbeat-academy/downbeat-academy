import { SectionContainer } from "@components/section-container"
import { SectionTitle } from "@components/section-title"
import { ContactForm } from "./contact-form"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact us | Downbeat Academy',
  description: 'Get in touch with us at Downbeat Academy with any questions or comments.',
}

export default function ContactPage() {
  return (
    <SectionContainer>
      <SectionTitle title='Contact Us' />
      <ContactForm />
    </SectionContainer>
  )
}
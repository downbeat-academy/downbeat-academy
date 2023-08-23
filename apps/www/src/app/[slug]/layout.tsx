import { Content, ContentWrapper } from "@app/components/content-wrapper"
import { Sidebar } from "@app/components/sidebar"

export default function PageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
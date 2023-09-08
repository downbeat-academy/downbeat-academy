import { ContentWrapper, Content } from "@components/content-wrapper"

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
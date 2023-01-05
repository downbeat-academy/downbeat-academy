import Analytics from "@hooks/useFathom"

interface AppLayoutProps {
  children: React.ReactNode,
}

export default function App({ children }: AppLayoutProps) {

  return (
    <html lang='en'>
      <body>
        {children}
      </body>
      <Analytics />
    </html>
  )
}
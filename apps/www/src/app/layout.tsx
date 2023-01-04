import Analytics from "@hooks/useFathom"

interface AppProps {
  children: React.ReactNode,
}

export default function App({ children }: AppProps) {

  return (
    <html lang='en'>
      <body>
        {children}
      </body>
      <Analytics />
    </html>
  )
}
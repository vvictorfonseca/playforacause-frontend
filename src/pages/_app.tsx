import "../styles/globals.css"
import React from "react"
import type { AppProps } from 'next/app'

import { Hydrate, QueryClient, QueryClientProvider } from "react-query"

import MainContainer from '@/layouts/MainContainer'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </Hydrate>
    </QueryClientProvider>
  )
}

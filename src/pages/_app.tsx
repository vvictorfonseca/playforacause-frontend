import "../styles/globals.css"
import React from "react"
import type { AppProps } from 'next/app'
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/react"

import { Hydrate, QueryClient, QueryClientProvider } from "react-query"

import { UserProvider } from "@/contexts/userContext"

import MainContainer from '@/layouts/MainContainer'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient())

  return (
    <>
      <Head>
        <title>Brechó Fut</title>
      </Head>

      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserProvider>
            <ChakraProvider>
              <MainContainer>
                <Component {...pageProps} />
              </MainContainer>
            </ChakraProvider>
          </UserProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

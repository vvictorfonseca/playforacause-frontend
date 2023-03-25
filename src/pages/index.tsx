import Head from "next/head"
import { GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"

import { getProducts } from "@/services/api"

import { IProduct } from "@/interfaces/productsInterface"

import Product from "@/components/Product"

export default function Home() {
  const { data } = useQuery<IProduct[]>('products', getProducts)
  
  return (
    <>
      <Head>
        <title>E-commerce</title>
      </Head>

      <main className=" w-[90%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap">
        
        {
          data ? (
            data.map((product, index) => {
              return (<Product key={index} {...product} />)
            })
          ) : (
            <h1 className=" font-bold text-2xl">No products</h1>
          )
        }

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IProduct[]>('products', getProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

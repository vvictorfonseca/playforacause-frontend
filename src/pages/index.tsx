import axios from "axios"
import { dehydrate, QueryClient, useQuery } from "react-query"

import Head from "next/head"
import { GetStaticProps } from "next"
import { IProduct } from "@/interfaces/productsInterface"

import Product from "@/components/Producst"

export const getProducts = async () => {

  try {
    const res = await axios.get("http://localhost:4000/products")

    return res.data
  
  } catch (error) {
    alert(error)
  }

}

function Home() {
  const { data, isLoading, isFetching } = useQuery<IProduct[]>('products', getProducts)
  
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

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IProduct[]>('products', getProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

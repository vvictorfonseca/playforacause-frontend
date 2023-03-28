import Head from "next/head"
import { GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"

import { Spin } from 'antd';

import { getProducts } from "@/services/api"

import { IProduct } from "@/interfaces/productsInterface"

import Product from "@/components/Product"

export default function Home() {
  const { data, isFetching } = useQuery<IProduct[]>('products', getProducts)

  return (
    <>
      <main className=" w-[90%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap">

        {
          isFetching ? (
            <div className=" w-[100%] h-[50vh] flex justify-center items-center">
              <Spin size='large' />
            </div>

          ) : data ? (
            data.map((product, index) => {
              return (<Product key={index} {...product} />)
            })

          ) : (
            <div className=" w-[100%] h-[50vh] flex justify-center items-center">
              <h1 className=" font-bold text-2xl">Sem produtos na Loja!</h1>
            </div>
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

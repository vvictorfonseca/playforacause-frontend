import { GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { Spin } from 'antd';

import { ICart } from "@/interfaces/cartsInterface"

import { getUserCart } from "@/services/api"

import CartProduct from "@/components/CartProduct"
import SubTotalCart from "@/components/SubTotalCart"
import NodataCart from "@/components/NodataCart"

export default function Cart() {
  const queryClient = useQueryClient()

  function invalidQuerie() {
    queryClient.invalidateQueries('carts')
  }

  const { data, isFetching } = useQuery<ICart[]>('carts', getUserCart)

  return (
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex sm:flex-row flex-col justify-center items-center gap-10 flex-wrap ">

      {
        isFetching ? (

          <div className=" w-[100%] h-[50vh] flex justify-center items-center">
            <Spin size='large' />
          </div>

        ) : !data ? (

          <NodataCart content={"Precisa estar logado para acessar seu carrinho!"} />

        ) : data.length == 0 ? (

          <NodataCart content="Seu carrinho está vazio!" />

        ) : (
          <>

            <>
              <SubTotalCart cart={data} />
            </>

            <div className=" sm:w-[100%] sm:flex sm:flex-col gap-9 sm:items-center sm:justify-center items-center">
              {data.map((product, index) => {
                return (<CartProduct key={index} onClick={invalidQuerie} product={product} />)
              })}
            </div>
          </>
        )
      }

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<ICart[]>('carts', getUserCart)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
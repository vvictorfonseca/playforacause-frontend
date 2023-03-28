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
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">

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
            {data.map((product, index) => {
              return (<CartProduct key={index} onClick={invalidQuerie} product={product} />)
            })}
            <>
              <SubTotalCart cart={data} />
            </>
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
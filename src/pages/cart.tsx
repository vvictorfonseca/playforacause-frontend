import { GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"

import { ICart } from "@/interfaces/cartsInterface"

import { getUserCart } from "@/services/api"

export default function Cart() {
  const { data } = useQuery<ICart[]>('carts', getUserCart)

  if(!data) return <p>Seu carrinho está vazio!</p>

  console.log("cart", data)
  return (
    <>
      <p>Carrinho de compras do usuário</p>
    </>
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
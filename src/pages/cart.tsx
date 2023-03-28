import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { ICart } from "@/interfaces/cartsInterface"

import { getUserCart } from "@/services/api"

import CartProduct from "@/components/CartProduct"
import SubTotalCart from "@/components/SubTotalCart"
import NodataCart from "@/components/NodataCart"

export default function Cart() {
  const queryClient = useQueryClient()

  const router = useRouter()

  function invalidQuerie() {
    queryClient.invalidateQueries('carts')
  }

  const { data } = useQuery<ICart[]>('carts', getUserCart)

  if (!data) return (
    <NodataCart content={"Precisa estar logado para acessar seu carrinho!"} />
  )

  console.log("AllCartDara", data)
  return (
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">

      {
        data.length == 0 ? (
          
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
        )}

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
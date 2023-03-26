import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { ICart } from "@/interfaces/cartsInterface"

import { getUserCart } from "@/services/api"

import CartProduct from "@/components/CartProduct"

export default function Cart() {
  const queryClient = useQueryClient()

  const router = useRouter()

  function invalidQuerie() {
    queryClient.invalidateQueries('carts')
  }

  const { data } = useQuery<ICart[]>('carts', getUserCart)

  if (!data) return <p>No data!</p>

  console.log("AllCartDara", data)
  return (
    <main className=" w-[90%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap">

      {
        data.length == 0 ? (
          <div className=" w-[100%] h-[60vh] flex flex-col justify-center items-center gap-6">
            <h1 className=" text-2xl font-bold">Seu carrinho está vazio!</h1>
            <button onClick={() => router.push("/")} className=" text-white bg-[#FF5A5F] p-3 rounded">Voltar para produtos</button>
          </div>

        ) : (

          data.map((product, index) => {
            return (<CartProduct key={index} onClick={invalidQuerie} product={product} />)

          })

        )
      }

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<ICart[]>('carts', getUserCart, {
    staleTime: 200
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
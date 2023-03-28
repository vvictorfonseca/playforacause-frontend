import { GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { useRouter } from "next/router"

import { getUserPurchases } from "@/services/api"

import { IPurchases } from "@/interfaces/purchasesInterface"

import Purchase from "@/components/Purchase"

export default function Purchases() {
  const { data } = useQuery<IPurchases[]>('purchases', getUserPurchases)

  const router = useRouter()

  if (!data) return

  return (
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">

      {
        data.length == 0 ? (
          <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">
            <div className=" w-[100%] h-[60vh] flex flex-col justify-center items-center gap-6">
              <h1 className=" text-2xl font-bold">Você ainda não comprou nada!</h1>
              <button onClick={() => router.push("/")} className=" text-white bg-[#FF5A5F] p-3 rounded">Voltar para produtos</button>
            </div>
          </main>
        ) : (

          data.map((purchase, index) => {
            return (<Purchase key={index} purchase={purchase} />)
          })

        )
      }

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery<IPurchases[]>('purchases', getUserPurchases)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
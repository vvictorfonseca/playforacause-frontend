import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { useState } from "react"

import { ICreditCard } from "@/interfaces/paymentInterface"
import { ICart } from "@/interfaces/cartsInterface"

import { getUserCart } from "@/services/api"

import CreditCardForm from "@/components/CredidCardForm"
import AddresForm from "@/components/AddressForm"

export default function Payment() {
  const { data } = useQuery<ICart[]>('carts', getUserCart)

  const [creditInfoComplete, setCreditInfoComplete] = useState<boolean>(false)
  const [creditCardInfo, setCreditCardInfo] = useState<ICreditCard>()

  if(!data) return

  let subTotal = 0

  data.forEach((cartInfo) => {
    subTotal = subTotal + cartInfo.products.price
  })
  
  return (
    <div className=" w-[100vw] flex flex-col sm:flex-row justify-center items-center">
      <div className=" w-[50%] sm:h-[82vh] h-[100%]">
        <CreditCardForm setCreditCardInfo={setCreditCardInfo} subTotal={subTotal} setCreditInfoComplete={setCreditInfoComplete} />
      </div>
      <div className=" w-[50%] sm:h-[82vh] h-[100%]">
        <AddresForm cart={data} creditInfoComplete={creditInfoComplete} />
      </div>
    </div>
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
import { useState } from "react"
import axios from "axios"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"

import { GetStaticProps, GetStaticPaths } from "next"
import { IProduct } from "@/interfaces/productsInterface"
import { IAddToCartButtonProps } from "@/interfaces/cartsInterface"

import { getProducts } from "@/services/api"

import IncrementUnit from "@/components/IncrementUnit"
import AddToCartButton from "@/components/AddToCartButton"

interface IProductProps {
  params: {
    productId: string;
  }
}

export default function Product({ params }: IProductProps) {
  const [unit, setUnit] = useState<number>(1)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<IProduct>('product', async () => {

    try {
      const res = await axios.get(`http://localhost:4000/product/${params.productId}`)
      return res.data

    } catch (error) {
      alert(error)
    }
  })

  if (!data) return 
  if (isLoading) return <p>Loading</p>

  let addToCartBody: IAddToCartButtonProps = {
    units: unit,
    productId: data.id,
    queryClient: queryClient
  }

  return (
    <main className=" flex flex-wrap w-[50%] h-[43.5vh] bg-white mt-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <aside className=" h-[100%] w-[40%] border-r-2 border-gray-300">
        <img width={400} height={600} src={data.image} alt="Camisa"></img>
      </aside>
      <div className=" flex flex-col h-[100%] w-[60%]">
        <section className=" h-[50%] w-[100%] p-3 border-b-2 border-gray-300 ">
          <h2 className=" text-3xl font-semibold">{data.name}</h2>
          <h4 className=" text-sm">{data.description}</h4>

          <p className=" mt-10 font-bold text-[#FF5A5F]">{data.units} unidades no estoque</p>
        </section>
        <article className=" flex justify-around h-[50%] border-b-2 border-gray-300">
          <div className=" p-3 gap-9 w-[50%] flex flex-col justify-center">
            <div>
              <span>Por: </span><span className=" font-bold">R${data.price},00</span>
            </div>

            <div>
              <span>Tamanho: </span><span className=" font-bold">{data.size.toUpperCase()}</span>
            </div>
          </div>
          <div className=" flex flex-col justify-center gap-6 items-center w-[50%]">

          <IncrementUnit unit={unit} setUnit={setUnit} productUnits={data.units} isCart={false} productId={0} cartId={0} isOpen={""} setIsOpen={() => null} />

          <AddToCartButton infos={addToCartBody} />

          </div>
        </article>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { params } = context

  const queryClient = new QueryClient()

  if (params) {
    await queryClient.prefetchQuery<IProduct>('products', async () => {
      try {
        const res = await axios.get(`http://localhost:4000/product/${params.productId}`)
        return res.data

      } catch (error) {

        alert(error)
      }
    })
  }

  return {
    props: {
      params: params,
      dehydratedState: dehydrate(queryClient)
    }
  }

}

export const getStaticPaths: GetStaticPaths = async () => {

  const data: IProduct[] = await getProducts()

  const paths = data.map((product) => {
    return {
      params: {
        productId: `${product.id}`
      }
    }
  })

  return { paths, fallback: false }
}
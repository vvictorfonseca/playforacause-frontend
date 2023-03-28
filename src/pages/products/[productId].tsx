import { useState } from "react"
import axios from "axios"
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query"
import { useRouter } from "next/router";

import { Spin } from 'antd';

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
  const router = useRouter()

  const { data, isFetching } = useQuery<IProduct>('product', async () => {

    try {
      const res = await axios.get(`https://api-playforacause.onrender.com/product/${params.productId}`)
      return res.data

    } catch (error) {
      alert(error)
    }
  })

  if (!data) return

  let addToCartBody: IAddToCartButtonProps = {
    units: unit,
    productId: data.id,
    queryClient: queryClient
  }

  return (

    <main className=" flex flex-wrap mb-9 sm:mb-0 w-[80%] h-[100%] sm:w-[50%] sm:h-[43.5vh] bg-white mt-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      {
        isFetching ? (
          <div className=" w-[100%] h-[60vh] sm:h-[100%] flex justify-center items-center">
            <Spin size='large' />
          </div>

        ) : (
          <>
            <aside className="flex justify-center items-center mt-3 sm:mt-0 h-[33.3%] w-[100%] sm:h-[100%] sm:w-[40%] sm:border-r-2 border-gray-300">
              <img width={'90%'} height={'90%'} className=" rounded-md" src={data.image} alt="Camisa"></img>
            </aside>
            <div className=" flex flex-col h-[67.7%] w-[100%] sm:h-[100%] sm:w-[60%]">
              <section className=" h-[50%] w-[100%] p-3 border-b-2 border-gray-300 ">
                <h2 className=" sm:text-3xl text-xl font-semibold">{data.name}</h2>
                <h4 className=" text-sm">{data.description}</h4>

                <p className=" sm:mt-10 mt-4 font-bold text-[#FF5A5F]">{data.units} unidades no estoque</p>
              </section>
              <article className=" flex justify-around h-[50%]">
                <div className=" p-3 gap-9 w-[50%] flex flex-col justify-center">
                  <div>
                    <span>Por: </span><span className=" font-bold">R${data.price},00</span>
                  </div>

                  <div>
                    <span>Tamanho: </span><span className=" font-bold">{data.size.toUpperCase()}</span>
                  </div>
                </div>
                <div className=" flex flex-col p-4 sm:p-0 justify-center gap-6 items-center w-[50%]">

                  {
                    data.units == 0 ? (
                      
                      <button onClick={() => router.push("/")} className=" w-40 h-9 bg-[#FF5A5F] rounded">
                        <p className=" text-white text-sm font-normal">Voltar para produtos</p>
                      </button>
                    
                    ) : (
                      <>
                        <IncrementUnit unit={unit} setUnit={setUnit} productUnits={data.units} isCart={false} productId={0} cartId={0} isOpen={""} setIsOpen={() => null} />

                        <AddToCartButton infos={addToCartBody} />
                      </>
                    )
                  }


                </div>
              </article>
            </div>
          </>
        )
      }
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { params } = context

  const queryClient = new QueryClient()

  if (params) {
    await queryClient.prefetchQuery<IProduct>('products', async () => {
      try {
        const res = await axios.get(`https://api-playforacause.onrender.com/product/${params.productId}`)
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
import Head from "next/head"

import axios from "axios"
import { dehydrate, QueryClient, useQuery } from "react-query"

import ProductBox from "@/components/ProducstBox"

import { IProduct } from "@/interfaces/productsInterface"

//const getProducts = async () => await(await fetch('http://localhost:4000/products')).json()

const getProducts = async () => {

  try {
    const res = await axios.get("http://localhost:4000/products")

    return res.data
  
  } catch (error) {
    console.log("deu ruim")
  }

}

export default function Home() {
  const { data, isLoading, isFetching } = useQuery<IProduct[]>('products', getProducts)
  console.log(data)
  
  if(isLoading) return <p>...Loading</p>
  
  return (
    <>
      <Head>
        <title>E-commerce</title>
      </Head>

      <div className=" w-[90%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap">
        
        {
          data ? (
            data.map((product, index) => {
              return (<ProductBox key={index} {...product} />)
            })
          ) : (
            <p>...lOADING</p>
          )
        }

      </div>
    </>
  )
}

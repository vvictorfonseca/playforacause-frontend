import axios from "axios"
import { dehydrate, QueryClient, useQuery } from "react-query"

import { GetStaticProps, GetStaticPaths } from "next"
import { IProduct } from "@/interfaces/productsInterface"

import { getProducts } from ".."

interface IProductProps {
  params: {
    productId: string;
  }
}

export default function Product({ params }: IProductProps) {
  const { data } = useQuery<IProduct>('product', async () => {

    try {
      const res = await axios.get(`http://localhost:4000/product/${params.productId}`)
      return res.data

    } catch (error) {
      alert(error)
    }
  })

  return (
    <>
      <p>{data?.description}</p>
    </>
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
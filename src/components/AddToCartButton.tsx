import { useRouter } from "next/router"
import { IAddToCartProps, IAddToCartBody } from "@/interfaces/cartsInterface"

import { addToCart } from "@/services/api"

export default function AddToCartButton(props: IAddToCartProps) {
  const router = useRouter()

  const tokenStorage = localStorage.getItem('token')

  const body: IAddToCartBody = {
    tokenStorage: tokenStorage,
    addToCartBody: props.addToCartBody
  }

  function verifyUserIsLogged() {
    if (!tokenStorage) {
      alert("Precisa estar logado para adicionar ao carrinho")
      router.push("/auth")
    } else {
      addToCart(body)
    }
  }

  return (
    <button onClick={() => verifyUserIsLogged()} className=" w-40 h-9 bg-[#FF5A5F] rounded">
      <p className=" text-white text-sm font-normal">Adicionar ao Carrinho</p>
    </button>
  )
}
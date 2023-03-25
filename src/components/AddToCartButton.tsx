import { useRouter } from "next/router"
import { IAddToCartProps, IAddToCartBody } from "@/interfaces/cartsInterface"

import { useContext } from "react"
import UserContext, { IUserContext } from "@/contexts/userContext"

import { addToCart } from "@/services/api"

export default function AddToCartButton(props: IAddToCartProps) {
  const { userInfos } = useContext<IUserContext>(UserContext)
  const router = useRouter()

  const body: IAddToCartBody = {
    tokenStorage: userInfos.token,
    addToCartBody: props.addToCartBody,
    router: router
  }

  function verifyUserIsLogged() {
    if (!userInfos.token) {
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
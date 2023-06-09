import { useRouter } from "next/router"
import { IAddToCartBody, IAddToCartButtonProps } from "@/interfaces/cartsInterface"

import { useContext } from "react"
import UserContext, { IUserContext } from "@/contexts/userContext"

import { addToCart } from "@/services/api"

interface IProps {
  infos: IAddToCartButtonProps
}

export default function AddToCartButton({ infos }: IProps) {
  const { userInfos } = useContext<IUserContext>(UserContext)
  const router = useRouter()

  const body: IAddToCartBody = {
    tokenStorage: userInfos.token,
    addToCartBody: { productId: infos.productId, units: infos.units },
    router: router,
    queryClient: infos.queryClient
  }

  function verifyUserIsLogged() {
    if (!userInfos.token) {
      router.push("/auth")

    } else {
      addToCart(body)
    }
  }

  return (
    <button onClick={() => verifyUserIsLogged()} className=" sm:w-40 sm:h-9 w-28 h-9 bg-[#FF5A5F] rounded">
      <p className=" text-white sm:text-sm text-xs font-normal">Adicionar ao Carrinho</p>
    </button>
  )
}
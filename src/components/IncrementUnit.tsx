import { useContext } from "react";
import { useQueryClient } from "react-query"
import UserContext, { IUserContext } from "@/contexts/userContext";

import { IUpdateUnitToCart } from "@/interfaces/cartsInterface";

import { incrementUnitToCart, decrementUnitToCart } from "@/services/api";

interface IProps {
  unit: number;
  setUnit: (newState: number) => void | any;
  productUnits: number;
  productId: number;
  cartId: number;
  isCart: boolean;
}

export default function IncrementUnit(infos: IProps) {
  const { userInfos } = useContext<IUserContext>(UserContext)
  const queryClient = useQueryClient()

  function refresh() {
    queryClient.invalidateQueries('carts')
  }

  const updateCartBody: IUpdateUnitToCart = {
    cartId: infos.cartId,
    tokenStorage: userInfos.token,
    queryClient: refresh
  }

  function increment() {
    infos.unit < infos.productUnits ? infos.setUnit(infos.unit + 1) : alert("Não temos mais que isso em nosso estoque")
  }

  function decrement() {
    infos.unit > 1 ? infos.setUnit(infos.unit - 1) : null
  }

  return (
    <div className=" flex justify-between items-center w-32 h-9 rounded-md bg-slate-200 border-2 border-gray-200 ">

      <button
        onClick={() => {
          if (infos.isCart) {

            if (infos.unit > 0) {

              decrementUnitToCart(updateCartBody)

            } else {

              return
            }

          } else {

            decrement()
          }

        }}
        className=" w-[33.3%] h-[100%] bg-slate-300 rounded-md border-r-2 border-gray-200">

        <p className=" font-extrabold">-</p>
      </button>

      <div>
        <p>{infos.unit}</p>
      </div>

      <button
        onClick={() => {
          if (infos.isCart) {

            if (infos.unit < infos.productUnits) {

              incrementUnitToCart(updateCartBody)

            } else {

              alert("não temos mais esse produto em estoque")
            }

          } else {
            increment()
          }
        }}
        className=" w-[33.3%] h-[100%] bg-slate-300 rounded-md border-r-2 border-gray-200">

        <p className=" font-extrabold">+</p>
      </button>

    </div>
  )
}
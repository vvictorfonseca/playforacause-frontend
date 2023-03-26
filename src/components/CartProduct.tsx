import { useContext } from "react";

import UserContext, { IUserContext } from "@/contexts/userContext";

import { ICart, IDeleteproductOnCart } from "@/interfaces/cartsInterface"

import IncrementUnit from "./IncrementUnit";

import { deleteProductOnCart } from "@/services/api";

interface ICartProduct {
  product: ICart;
  onClick: any
}

export default function CartProduct({ product, onClick }: ICartProduct) {
  const { name, price, image, units, id } = product.products

  const { userInfos } = useContext<IUserContext>(UserContext)

  const body: IDeleteproductOnCart = {
    token: userInfos.token,
    cartId: product.id,
    onClick: onClick
  }

  return (
    <div className=" flex items-center w-[70%] h-44 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <div className=" w-[18%] h-[100%] bg-slate-700">
        <p>{image}</p>
      </div>
      <div className=" w-[60%] h-[100%] p bg-slate-600">
        <p>{name}</p>
      </div>
      <div className=" w-[32%] h-[100%] flex flex-col justify-evenly items-center">
        <h2 className=" font-semibold">R$ {price},00</h2>

        <IncrementUnit unit={product.units} setUnit={() => null} productUnits={units} isCart={true} productId={id} cartId={product.id} />
      </div>
    </div>
  )
}
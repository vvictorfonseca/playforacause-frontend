import { useContext, useState } from "react";

import UserContext, { IUserContext } from "@/contexts/userContext";

import { ICart, IDeleteproductOnCart } from "@/interfaces/cartsInterface"

import { DeleteIcon } from '@chakra-ui/icons'

import IncrementUnit from "./IncrementUnit";
import ModalComponent from "./Modal";

interface ICartProduct {
  product: ICart;
  onClick: any
}

export default function CartProduct({ product, onClick }: ICartProduct) {
  const { name, price, image, units, id, description, size } = product.products

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { userInfos } = useContext<IUserContext>(UserContext)

  const body: IDeleteproductOnCart = {
    token: userInfos.token,
    cartId: product.id,
    onClick: onClick
  }

  return (

    <div className=" flex items-center w-[50%] h-[139px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <div className=" w-[23%] h-[100%] border-r-2 border-gray-200">
        <img width={150} height={150} src={image} alt="Camisa"></img>
      </div>
      <div className=" flex flex-col justify-between  w-[55%] h-[100%] border-r[1px] p-3 border-r-2 border-gray-200">
        <div>
          <h2 className=" text-2xl font-semibold">{name}</h2>
          <h3>{description}</h3>
        </div>

        <div>
          <span>Tamanho: <span className=" font-bold">{size.toUpperCase()}</span></span>
        </div>
      </div>
      <div className=" w-[32%] h-[100%] flex flex-col relative justify-center gap-4 items-center">
        <h2 className=" font-semibold">R$ {price},00</h2>

        <IncrementUnit unit={product.units} setUnit={() => null} productUnits={units} isCart={true} productId={id} cartId={product.id} isOpen={isOpen} setIsOpen={setIsOpen} />
        <DeleteIcon onClick={() => setIsOpen(true)} className=" absolute top-3 right-3 cursor-pointer" />

        <ModalComponent body={body} isOpen={isOpen} setIsOpen={setIsOpen} content={"Deseja apagar este produto do carrinho?"} />
      </div>
    </div>
  )
}
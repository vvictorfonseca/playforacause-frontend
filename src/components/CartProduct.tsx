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

    <div className=" flex flex-col relative rounded-lg pb-4 mb-10 sm:mb-0 sm:pb-0 sm:rounded-none sm:flex-row items-center w-[100%] sm:w-[50%] sm:h-[139px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <div className=" w-[70%] h-[100%] mt-2 sm:mt-0 sm:w-[23%] sm:h-[100%] sm:border-r-2 sm:border-gray-200">
        <img className=" rounded-md sm:rounded-none" width={'100%'} height={'60%'} src={image} alt="Camisa"></img>
      </div>
      <div className=" flex flex-col justify-between gap-6 p-1 w-[65%] h-[100%] sm:w-[55%] sm:h-[100%] sm:border-r[1px] sm:border-r-2 sm:p-3 sm:border-gray-200 ">
        <div className=" gap-4 sm:gap-0">
          <h2 className=" text-xl sm:text-2xl font-semibold">{name}</h2>
          <h3>{description}</h3>
        </div>

        <div>
          <span>Tamanho: <span className=" font-bold">{size.toUpperCase()}</span></span>
        </div>
      </div>
      <div className=" w-[70%] sm:w-[32%] mt-7 sm:mt-0 h-[100%] flex flex-col sm:relative justify-center gap-4 items-center">
        <h2 className=" sm:font-semibold font-bold">R$ {price},00</h2>

        <IncrementUnit unit={product.units} setUnit={() => null} productUnits={units} isCart={true} productId={id} cartId={product.id} isOpen={isOpen} setIsOpen={setIsOpen} />
        <DeleteIcon onClick={() => setIsOpen(true)} className=" absolute top-3 sm:right-3 right-4 cursor-pointer text-xl sm:text-lg" />

        <ModalComponent body={body} isOpen={isOpen} setIsOpen={setIsOpen} content={"Deseja apagar este produto do carrinho?"} />
      </div>
    </div>
  )
}
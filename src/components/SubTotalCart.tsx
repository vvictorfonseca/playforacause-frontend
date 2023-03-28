import { useRouter } from "next/router";

import { ICart } from "@/interfaces/cartsInterface";

interface ISubTotalProps {
  cart: ICart[]
}

export default function SubTotalCart({ cart }: ISubTotalProps) {
  const router = useRouter()

  let subTotal = 0
  let items = 0

  cart.forEach((cartInfo) => {
    subTotal = subTotal + cartInfo.products.price
    items = items + cartInfo.units
  })

  return (
    <div className=" w-[20%] h-28 fixed flex flex-col gap-5 justify-center items-center right-7 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <span>Subtotal ({items} itens):<span className=" font-bold"> R$ {subTotal},00</span></span>
      <button onClick={() => router.push("/payment")} className=" text-white bg-[#FF5A5F] p-2 rounded">Finalizar Compra</button>
    </div>
  )

}
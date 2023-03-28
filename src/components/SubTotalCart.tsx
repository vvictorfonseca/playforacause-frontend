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
    <div className=" w-[85%] h-32 sm:w-[20%] sm:h-52 top-32 sm:top-[150px] sm:fixed flex flex-col gap-3 sm:gap-5 justify-center items-center sm:right-7 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <span>Subtotal ({items} itens):<span className=" font-bold"> R$ {subTotal},00</span></span>
      <button onClick={() => router.push("/payment")} className=" text-white bg-[#FF5A5F]  p-1 sm:p-2 rounded">Finalizar compra</button>
      <button onClick={() => router.push("/")} className=" text-white bg-[#FF5A5F] p-1 sm:p-2 rounded">Continuar comprando</button>
    </div>
  )

}
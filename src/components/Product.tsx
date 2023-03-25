import Link from "next/link"

import { IProduct } from "@/interfaces/productsInterface"

export default function Product(props: IProduct) {

  const productId = props.id

  return (
    <div className="transform h-72 bg-white w-52 transition duration-500 hover:scale-110 flex flex-col justify-center items-center p-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

      <div className=" w-[90%] h-[60%] border-b border-gray-400   ">
        <div>foto</div>
      </div>

      <div className="w-[90%] flex flex-col justify-between mt-2 bg-slate-50 p-1 rounded-md">
        <h2>{props.name}</h2>
        <h3 className="text-xs font-semibold">R$ {props.price},00</h3>
      </div>
      
      <Link href={`/products/${productId}`} legacyBehavior >
        <div className=" transform hover:scale-105 w-[35%] flex items-center justify-center bg-[#FF5A5F] text-white font-semibold rounded-md ml-20 mt-6 cursor-pointer">
          <a className="text-sm">Ver mais</a>
        </div>
      </Link>

    </div>
  )
}
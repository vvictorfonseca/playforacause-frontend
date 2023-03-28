import Link from "next/link"

import { IProduct } from "@/interfaces/productsInterface"

export default function Product(props: IProduct) {

  const productId = props.id

  return (
    <Link href={`/products/${productId}`} legacyBehavior>
      <div className="transform h-96 bg-white w-64 transition duration-500 hover:scale-110 flex flex-col justify-center items-center cursor-pointer p-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">

        <div className=" w-[90%] h-[60%]">
          <img width={280} height={280} className=" rounded-md" src={props.image} alt="camisa"></img>
        </div>

        <div className="w-[90%] flex flex-col justify-between mt-2 gap-1 bg-slate-50 p-1 rounded-md">
          <h2 className=" text-lg">{props.name}</h2>
          <h3 className="text-xs font-bold">R$ {props.price},00</h3>
        </div>

        {
          props.units == 0 ? (
            <div className=" w-[50%] flex items-center justify-center bg-[#FF5A5F] text-white font-semibold rounded-md ml-24 mt-12">
              <p className="text-sm">Indisponível</p>
            </div>
          ) : (
            <Link href={`/products/${productId}`} legacyBehavior >
              <div className=" transform hover:scale-105 w-[35%] flex items-center justify-center bg-[#FF5A5F] text-white font-semibold rounded-md ml-32 mt-12 cursor-pointer">
                <a className="text-sm">Ver mais</a>
              </div>
            </Link>
          )
        }
      </div>
    </Link>
  )
}
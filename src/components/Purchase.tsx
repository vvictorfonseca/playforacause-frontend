import { IPurchases } from "@/interfaces/purchasesInterface"

interface IProps {
  purchase: IPurchases
}

export default function Purchase({ purchase }: IProps) {

  const date = new Date(purchase.createdAt)

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
  ];

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  const formatDate = `${day} de ${month} de ${year}`

  return (
    <div className=" flex items-center w-[50%] h-[139px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <div className=" w-[23%] h-[100%] border-r-2 border-gray-200">
        <img width={200} height={200} src={purchase.products.image} alt="camisa"></img>
      </div>
      <div className=" flex flex-col justify-between  w-[55%] h-[100%] border-r[1px] p-3 border-r-2 border-gray-200">
        <div>
          <h2 className=" text-2xl font-semibold">{purchase.products.name}</h2>
          <h3 className=" text-sm">Comprado em: {formatDate}</h3>
        </div>

        <div>
          <span className=" text-sm">Chegará em: <span className=" font-bold">{purchase.address.street}, {purchase.address.number} - {purchase.address.city}</span></span>
        </div>
      </div>
      <div className=" w-[32%] h-[100%] flex flex-col relative justify-center gap-4 items-center">
        <h2 className=" font-semibold">{purchase.units} {purchase.units == 1 ? "unidade" : "unidades"}</h2>
        <span className=" font-bold">R$ {purchase.products.price * purchase.units},00</span>
      </div>
    </div>
  )
}
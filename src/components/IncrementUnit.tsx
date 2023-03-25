interface IProps {
  unit: number;
  setUnit: (newState: number) => void;
  productUnits: number;
}

export default function IncrementUnit(infos: IProps) {

  function increment() {
    infos.unit < infos.productUnits ? infos.setUnit(infos.unit + 1) : alert("Não temos mais que isso em nosso estoque")
  }

  function decrement() {
    infos.unit > 1 ? infos.setUnit(infos.unit - 1) : null
  }

  return (
    <div className=" flex justify-between items-center w-32 h-9 rounded-md bg-slate-200 border-2 border-gray-200 ">
      
      <button onClick={() => decrement()} className=" w-[33.3%] h-[100%] bg-slate-300 rounded-md border-r-2 border-gray-200">
        <p className=" font-extrabold">-</p>
      </button>
      
      <div>
        <p>{infos.unit}</p>
      </div>
      
      <button onClick={() => increment()} className=" w-[33.3%] h-[100%] bg-slate-300 rounded-md border-r-2 border-gray-200">
        <p className=" font-extrabold">+</p>
      </button>
    
    </div>
  )
}
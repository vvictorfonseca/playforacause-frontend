import { useRouter } from "next/router"

interface IProps {
  content: string;
}

export default function NodataCart({ content }: IProps) {
  const router = useRouter()

  function ButtonContent() {
    if (content == "Precisa estar logado para acessar seu carrinho!") {
      return "Login"
    } else {
      return "Voltar para produtos"
    }
  }
  
  return (
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">
      <div className=" w-[100%] h-[60vh] flex flex-col justify-center items-center gap-6">
        <h1 className=" text-2xl font-bold">{content}</h1>
        <button onClick={() => content.length > 45 ? router.push("/auth") : router.push("/")} className=" text-white bg-[#FF5A5F] p-3 rounded">{ButtonContent()}</button>
      </div>
    </main>
  )
}
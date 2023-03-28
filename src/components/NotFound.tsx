import { useRouter } from "next/router"

export default function NotFoundComponent() {
  const router = useRouter()

  return (
    <main className=" w-[100%] pt-5 mt-5 mb-6 flex justify-center gap-10 flex-wrap ">
      <div className=" w-[100%] h-[60vh] flex flex-col justify-center items-center gap-6">
        <h1 className=" text-2xl font-bold">Esse produto não existe em nossa Loja!</h1>
        <button onClick={() => router.push("/")} className=" text-white bg-[#FF5A5F] p-3 rounded">Voltar para produtos</button>
      </div>
    </main>
  )
}
import { useRouter } from "next/router"

export default function BackToProductsButton() {
  const router = useRouter()

  return (
    <div className="w-[100%] flex justify-center mt-3 mb-4 sm:mt-11">
      <button onClick={() => router.push("/")} className=" text-white p-2 bg-[#FF5A5F] sm:p-3 rounded">Voltar para produtos</button>
    </div>
  )
}
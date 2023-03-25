import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <ul className=" bg-[#3c3c3c] flex items-center justify-between gap-3 h-28 font-medium text-xl text-slate-50">

        <li className=" ml-10 hover:text-slate-200 transition">
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>

        <div className="flex gap-3 justify-end mr-10">
          <li className="hover:text-slate-200 transition">
            <Link href="/cart" legacyBehavior>
              <a>Carrinho</a>
            </Link>
          </li>

          <li className="hover:text-slate-200 transition">
            <Link href="/auth" legacyBehavior>
              <a>Logar</a>
            </Link>
          </li>
        </div>
      
      </ul>
    </nav>
  )
}
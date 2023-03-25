import Link from "next/link";

import { useContext, useEffect } from "react";

import UserContext, { IUserContext } from "@/contexts/userContext";

export default function Header() {
  const { userInfos, setUserInfos } = useContext<IUserContext>(UserContext)

  useEffect(() => {

    const userIdString = localStorage.getItem('userId');
    const userId = userIdString !== null ? JSON.parse(userIdString) : null;

    const firstNameString = localStorage.getItem('firstName');
    const firstName  = firstNameString !== null ? JSON.parse(firstNameString) : null;

    const tokenString = localStorage.getItem('token');
    const token = tokenString !== null ? JSON.parse(tokenString) : null

    setUserInfos({
      id: userId,
      firstName: firstName,
      token: token
    })
  
  }, [])

  return (
    <nav>
      <ul className=" bg-[#3c3c3c] flex items-center justify-between gap-3 h-28 font-medium text-xl text-slate-50">

        <li className=" ml-20 hover:text-slate-200 transition">
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>

        {
          userInfos.firstName !== null ? (
            <h2>Bem vindo, {userInfos.firstName}</h2>
          ) : (
            null
          )
        }

        <div className="flex gap-3 justify-end mr-20">
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
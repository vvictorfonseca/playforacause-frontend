import Link from "next/link";

import { useContext, useEffect, useState } from "react";

import UserContext, { IUserContext } from "@/contexts/userContext";

import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import ModalComponent from "./Modal";

export default function Header() {
  const { userInfos, setUserInfos } = useContext<IUserContext>(UserContext)
  console.log(userInfos.token)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {

    const userIdString = localStorage.getItem('userId');
    const userId = userIdString !== null ? JSON.parse(userIdString) : null;

    const firstNameString = localStorage.getItem('firstName');
    const firstName = firstNameString !== null ? JSON.parse(firstNameString) : null;

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

        <li className=" font-tittle text-3xl ml-20 hover:text-slate-200 transition">
          <Link href="/" legacyBehavior>
            <a>Brechó-Fut</a>
          </Link>
        </li>

        <div className="flex flex-col gap-2 justify-end mr-20 w-32 ">
          <div className=" flex justify-around">
            <li className="hover:text-slate-200 transition">
              <Link href="/cart" legacyBehavior>
                <AiOutlineShoppingCart size={35} cursor={'pointer'} />
              </Link>
            </li>

            <li className="hover:text-slate-200 transition">
              {
                userInfos.token ? (
                  <>
                    <Link href="/" legacyBehavior>
                      <BiLogOut onClick={() => setIsOpen(true)} size={35} cursor={'pointer'} />
                    </Link>

                    <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} body={""} content={"Deseja se Deslogar?"} />
                  </>
                ) : (

                  <Link href="/auth" legacyBehavior>
                    <AiOutlineUser size={35} cursor={'pointer'} />
                  </Link>
                )
              }
            </li>
          </div>
        
          {
          userInfos.firstName !== null ? (
            <p className=" text-white text-xs text-center ">Bem vindo, {userInfos.firstName}</p>
          ) : (
            null
          )
        }
        </div>

      </ul >
    </nav >
  )
}
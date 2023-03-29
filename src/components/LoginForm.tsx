import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import UserContext, { IUserContext } from "@/contexts/userContext";

import { login } from "@/services/api";
import { ILoginProps } from "@/interfaces/authInterface";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const router = useRouter()
  const { userInfos, setUserInfos, } = useContext<IUserContext>(UserContext)

  return (
    <div className=" w-[100%] h-[100%] flex flex-col items-center p-5">
      <form
        className=" w-[80vw] sm:w-[80%] h-[100%] flex flex-col items-center bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-6"
        onSubmit={handleSubmit((data) => {

          const body: ILoginProps = {
            data: data,
            userInfos: userInfos,
            setUserInfos: setUserInfos,
            router: router
          }

          login(body)
        })}
      >
        <div className="w-[87.2%] flex justify-start mt-5">
          <h1 className=" text-3xl font-bold">Entrar</h1>
        </div>

        <input
          className="w-[87.2%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
          {...register("email", { required: "Esse campo é obrigatório" })}
          placeholder="E-mail"
        />

        <input
          className="w-[87.2%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
          {...register("password", { required: "Esse campo é obrigatório" })}
          type={'password'}
          placeholder="Senha"
        />

        <input
          className="w-[45%] h-12 mt-11 bg-[#FF5A5F] text-lg text-white cursor-pointer rounded border-[1px] border-gray-300"
          type={'submit'}
        />

      </form>
    </div>
  )
}
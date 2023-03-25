import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <div className=" w-[100%] h-[100%] flex flex-col items-center p-5 ">
      <form
        className=" w-[80%] h-[100%] flex flex-col items-center bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-6"
        onSubmit={handleSubmit((data) => {
          console.log(data)
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
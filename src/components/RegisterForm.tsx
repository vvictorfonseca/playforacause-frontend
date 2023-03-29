import React from "react";
import { useForm } from "react-hook-form";

import { signUp } from "@/services/api";

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      surname: "",
      password: ""
    }
  })

  return (
    <div className=" w-[100%] h-[100%] flex flex-col items-center p-5 ">
      <form
        className=" w-[80vw] sm:w-[80%] h-[100%] flex flex-col items-center bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-1"
        onSubmit={handleSubmit((data) => {
          signUp(data)
        })}
      >
        
        <div className="w-[87.2%] flex justify-start mt-5">
          <h1 className=" text-3xl font-bold">Cadastre-se</h1>
        </div>

        <input
          className="w-[87.2%] h-12 pl-[14px] rounded border-[1px] mt-5 border-gray-300"
          {...register("email", { required: "Esse campo é obrigatório" })}
          placeholder="E-mail"
        />
        <div className="w-[87.2%] flex justify-start">
          <p className=" text-[#FF5A5F] text-sm">{errors.email?.message}</p>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
              {...register("firstName", { required: "Esse campo é obrigatório" })}
              placeholder="Nome"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.firstName?.message}</p>
            </div>
          </div>

          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
              {...register("surname", {
                required: "Esse campo é obrigatório", minLength: {
                  value: 4,
                  message: "Mínimo 4 caractéres"
                }
              })}
              placeholder="Sobrenome"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.surname?.message}</p>
            </div>
          </div>
        </div>

        <div className=" w-[86%] flex justify-end mt-5">
          <div className=" w-[46%]">
            <input
              className="w-[100%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
              {...register("password", { required: "Esse campo é obrigatório" })}
              type={'password'}
              placeholder="Senha"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.email?.message}</p>
            </div>
          </div>
        </div>


        <input
          className="w-[45%] h-12 mt-11 bg-[#FF5A5F] text-lg text-white cursor-pointer rounded border-[1px] border-gray-300"
          type={'submit'}
          value={'Cadastrar'}
        />

      </form>
    </div>
  )
}
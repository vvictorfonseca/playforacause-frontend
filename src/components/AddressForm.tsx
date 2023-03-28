import axios from 'axios';
import { useRouter } from "next/router"
import { useContext } from 'react';
import { useForm } from "react-hook-form"
import { ChangeEvent } from 'react';

import UserContext, { IUserContext } from '@/contexts/userContext';

import { ICart } from '@/interfaces/cartsInterface';

import { createAddress } from '@/services/api';

interface IProps {
  cart: ICart[];
  creditInfoComplete: boolean
}

export default function AddresForm({ cart, creditInfoComplete }: IProps) {
  const { userInfos } = useContext<IUserContext>(UserContext)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, setValue, setFocus } = useForm({
    defaultValues: {
      cep: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: ""
    }
  })

  const checkCEP = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');

    if (cep.length == 8) {
      const promise = axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      promise.then(response => {
        const { data } = response
        setValue('city', data.localidade)
        setValue('district', data.bairro)
        setValue('street', data.logradouro)
        setFocus('number')
      })
      .catch(() => {
        alert("CEP não encontrado!")
      })
    }
  }

  return (
    <div className=" w-[100%] h-[100%] flex flex-col items-center p-5 mt-[-120px] sm:mt-0 ">
      <form
        className=" w-[80vw] h-[75%] sm:w-[80%] sm:h-[100%] flex flex-col items-center bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-1"
        onSubmit={handleSubmit((data) => {
          if(creditInfoComplete) {
            createAddress(cart, data, userInfos.token, router)
          } else {
            alert("Complete as informações de pagamento")
          }
        })}
      >

        <div className="w-[87.2%] flex justify-start mt-5">
          <h1 className=" text-3xl font-bold">Endereço de entrega</h1>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('cep', { required: "Esse campo é obrigatório" })}
              onBlur={checkCEP}
              placeholder="CEP"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.cep?.message}</p>
            </div>
          </div>

          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('city', {
                required: "Esse campo é obrigatório"
              })}
              placeholder="Cidade"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.city?.message}</p>
            </div>
          </div>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('district', { required: "Esse campo é obrigatório" })}
              placeholder="Bairro"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.district?.message}</p>
            </div>
          </div>

          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('street', {
                required: "Esse campo é obrigatório", minLength: {
                  value: 4,
                  message: "Mínimo 4 caractéres"
                }
              })}
              placeholder="Rua"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.street?.message}</p>
            </div>
          </div>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('number', { required: "Esse campo é obrigatório" })}
              placeholder="Número"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.number?.message}</p>
            </div>
          </div>

          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register('complement')}
              placeholder="Complemento"
            />
          </div>
        </div>

        <input
          className="sm:w-[45%] w-[55%] h-12 mt-11 bg-[#FF5A5F] text-lg text-white cursor-pointer rounded border-[1px] border-gray-300"
          type={'submit'}
          value={'Finalizar compra'}
        />

      </form>
    </div>
  )
}
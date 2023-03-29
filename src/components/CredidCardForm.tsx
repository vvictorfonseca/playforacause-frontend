import { useForm } from 'react-hook-form';

import { ICreditCard } from '@/interfaces/paymentInterface';

interface IProps {
  setCreditCardInfo: (newState: ICreditCard) => void;
  subTotal: number;
  setCreditInfoComplete: (newState: boolean) => void;
}

export default function CreditCardForm({ setCreditCardInfo, subTotal, setCreditInfoComplete }: IProps) {
  const { register, handleSubmit, watch, setFocus, resetField, formState: { errors }, setValue } = useForm({
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      divide: ""
    }
  })

  const oneDivide = subTotal;
  const twoDivides = subTotal / 2;
  const threeDivides = subTotal / 3;

  function handleCardNumberInput(event: any) {
    const { value } = event.target;
    if(value.length == 19) {
      setFocus('name')
    }
    const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ');
    setValue('number', formattedValue);
  }

  function handleNameInput(event: any) {
    const value = event.target.value.toUpperCase();
    setValue('name', value);
  };

  function formatExpiryDate(value: string) {
    let formattedValue = value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
    }
    return formattedValue;
  }

  function handleExpiryChange(event: any) {
    const { value } = event.target;
    const formattedValue = formatExpiryDate(value);
    setValue('expiry', formattedValue);
  }

  return (
    <div className=" w-[100%] flex flex-col items-center p-5 ">
      <form
        className=" w-[80vw] sm:w-[80%] sm:h-[100%] h-[500px] pt-3 pb-3 mb-7 flex flex-col items-center bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-1"
        onSubmit={handleSubmit((data) => {
          setCreditCardInfo(data)
          setCreditInfoComplete(true)
        })}
      >

        <div className="w-[87.2%] flex justify-start mt-5">
          <h1 className=" text-3xl font-bold">Pagamento</h1>
        </div>

        <input
          className="w-[87.2%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] mt-5 border-gray-300"
          {...register("number", {
            required: "Esse campo é obrigatório",
          })}
          type={'tel'}
          onFocus={() => setFocus('number')}
          onChange={handleCardNumberInput}
          placeholder="Número do Cartão"
        />
        <div className="w-[87.2%] flex justify-start">
          <p className=" text-[#FF5A5F] text-sm">{errors.number?.message}</p>
        </div>

        <input
          className="w-[87.2%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] mt-5 border-gray-300"
          {...register("name", {
            required: "Esse campo é obrigatório",
          })}
          type={'text'}
          onFocus={() => setFocus('name')}
          onChange={handleNameInput}
          placeholder="Nome"
        />
        <div className="w-[87.2%] flex justify-start">
          <p className=" text-[#FF5A5F] text-sm">{errors.name?.message}</p>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register("expiry", {
                required: "Esse campo é obrigatório",
                maxLength: {
                  value: 5,
                  message: "4 dígitos"
                },
                minLength: {
                  value: 5,
                  message: "4 dígitos"
                }
              })}
              type={'tel'}
              onFocus={() => setFocus('expiry')}
              onChange={handleExpiryChange}
              placeholder="Validade"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.expiry?.message}</p>
            </div>
          </div>

          <div className=" w-[40%]">
            <input
              className="w-[100%] h-12 sm:pl-[14px] pl-[6px] rounded border-[1px] border-gray-300"
              {...register("cvc", {
                required: "Esse campo é obrigatório",
                maxLength: {
                  value: 3,
                  message: "3 caractéres"
                },
                minLength: {
                  value: 3,
                  message: "3 caractéres"
                }
              })}
              type={'number'}
              onFocus={() => setFocus('cvc')}
              placeholder="cvc"
            />
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.cvc?.message}</p>
            </div>
          </div>
        </div>

        <div className=" w-[100%] flex justify-evenly mt-5 ">
          <div className=" w-[40%]">
            <h2 className=' text-lg font-bold'>Total: R$ {subTotal}</h2>
          </div>

          <div className=" w-[40%]">
            <select
              className="w-[100%] h-12 pl-[14px] rounded border-[1px] border-gray-300"
              {...register('divide', {
                required: "Selecione uma opção"
              })}
            >
              <option value={""}>-- Parcelamento --</option>
              <option value={"1"}>1x: R${oneDivide.toFixed(2)}</option>
              <option value={"2"}>2x: R${twoDivides.toFixed(2)}</option>
              <option value={"3"}>3x: R${threeDivides.toFixed(2)}</option>
            </select>
            <div className="w-[87.2%] flex justify-start">
              <p className=" text-[#FF5A5F] text-sm">{errors.divide?.message}</p>
            </div>
          </div>
        </div>

        <input
          className="w-[45%] h-12 mt-5 bg-[#FF5A5F] text-lg text-white cursor-pointer rounded border-[1px] border-gray-300"
          type={'submit'}
          value={'Salvar'}
        />

      </form>
    </div>
  )
}


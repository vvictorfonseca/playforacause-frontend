import axios from "axios";

import { IAddToCartBody } from "@/interfaces/cartsInterface";
import { ISignUp } from "@/interfaces/authInterface";

export function addToCart({ tokenStorage, addToCartBody }: IAddToCartBody) {
  console.log(tokenStorage, addToCartBody )
}

export async function signUp(props: ISignUp) {
  console.log("to aqui ó")
  console.log(props)

  const body: ISignUp = {
    email: props.email,
    firstName: props.firstName,
    surname: props.surname,
    password: props.password
  }

  const URL = "http://localhost:4000/user"

  try {
    const res = await axios.post(URL, body)
    console.log(res.data)
    alert("Usuário Cadastrado com sucesso")
  
  } catch (error) {
    console.log(error)
  }
}
import { useContext } from "react";
import axios from "axios";

import UserContext, { IUserContext } from "@/contexts/userContext";

import { IAddToCart, IAddToCartBody } from "@/interfaces/cartsInterface";
import { ISignUp, ILogin, ILoginProps } from "@/interfaces/authInterface";

export async function getProducts() {

  const URL = "http://localhost:4000/products"

  try {
    const res = await axios.get(URL)
    return res.data
  
  } catch (error) {
    alert(error)
  }
}

export async function signUp(props: ISignUp) {
  
  const body: ISignUp = {
    email: props.email,
    firstName: props.firstName,
    surname: props.surname,
    password: props.password
  }

  const URL = "http://localhost:4000/user"

  try {
    await axios.post(URL, body)
    alert("Usuário Cadastrado com sucesso")
  
  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function login(props: ILoginProps) {
  
  const body: ILogin = {
    email: props.data.email,
    password: props.data.password
  }

  const URL = "http://localhost:4000/user/login"

  try {
    const response = await axios.post(URL, body)
    const { data } = response

    const token = JSON.stringify(data.token)
    const userId = JSON.stringify(data.id)
    const firstName = JSON.stringify(data.firstName)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('firstName', firstName)

    props.router.push("/")
  
  } catch (error: any) {
    alert(error.response.data)
  } 
}

export async function addToCart({ tokenStorage, addToCartBody, router }: IAddToCartBody) {
  
  const body: IAddToCart = {
    productId: addToCartBody.productId,
    units: addToCartBody.units
  }

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = "http://localhost:4000/cart"

  try {
    await axios.post(URL, body, config)
    alert("Produto adicionado ao carrinho")
    
    router.push("/")
  
  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function getUserCart() {
  const tokenString = localStorage.getItem('token');
  const token = tokenString !== null ? JSON.parse(tokenString) : null

  if(!token) {
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const URL = "http://localhost:4000/cart"

  try {
    const response = await axios.get(URL, config)
    return response.data
  
  } catch (error: any) {
    alert(error.response.data)
  }
}
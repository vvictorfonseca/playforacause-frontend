import axios from "axios";

import { IAddToCart, IAddToCartBody, ICart, IDeleteproductOnCart, IUpdateUnitToCart } from "@/interfaces/cartsInterface";
import { ISignUp, ILogin, ILoginProps } from "@/interfaces/authInterface";
import { IAddress } from "@/interfaces/paymentInterface";

export async function getProducts() {

  const URL = "https://api-playforacause.onrender.com/products"

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

  const URL = "https://api-playforacause.onrender.com/user"

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

  const URL = "https://api-playforacause.onrender.com/user/login"

  try {
    const response = await axios.post(URL, body)
    const { data } = response

    const token = JSON.stringify(data.token)
    const userId = JSON.stringify(data.id)
    const firstName = JSON.stringify(data.firstName)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('firstName', firstName)

    props.setUserInfos({
      id: data.id,
      firstName: data.firstName,
      token: data.token
    })

    props.router.push("/")

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function addToCart({ tokenStorage, addToCartBody, router, queryClient }: IAddToCartBody) {

  const body: IAddToCart = {
    productId: addToCartBody.productId,
    units: addToCartBody.units
  }

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = "https://api-playforacause.onrender.com/cart"

  try {
    await axios.post(URL, body, config)
    queryClient

    router.push("/cart")

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function incrementUnitToCart({ cartId, tokenStorage, queryClient }: IUpdateUnitToCart) {

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = `https://api-playforacause.onrender.com/cart/increment/${cartId}`

  try {
    await axios.put(URL, {}, config)
    queryClient()

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function decrementUnitToCart({ cartId, tokenStorage, queryClient }: IUpdateUnitToCart) {

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = `https://api-playforacause.onrender.com/cart/decrement/${cartId}`

  try {
    await axios.put(URL, {}, config)
    queryClient()

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function getUserCart() {
  const tokenString = localStorage.getItem('token');
  const token = tokenString !== null ? JSON.parse(tokenString) : null

  if (!token) {
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const URL = "https://api-playforacause.onrender.com/cart"

  try {
    const response = await axios.get(URL, config)
    return response.data

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function deleteProductOnCart(props: IDeleteproductOnCart) {

  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`
    }
  }

  const URL = `https://api-playforacause.onrender.com/cart/${props.cartId}`

  try {
    await axios.delete(URL, config)
    props.onClick()

  } catch (error: any) {
    alert(error.response.data)
  }
}

export async function createAddress(cart: ICart[], addressInfo: IAddress, tokenStorage: string | undefined | null, router: any) {

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = "https://api-playforacause.onrender.com/address"

  try {
    await axios.post(URL, addressInfo, config)
    console.log("deu bom no endereço")

    await createPurchase(cart, tokenStorage, router)

  } catch (error: any) {
    console.log(error.response.data)
  }

}

export async function createPurchase(cart: ICart[], tokenStorage: string | undefined | null, router: any) {

  const config = {
    headers: {
      Authorization: `Bearer ${tokenStorage}`
    }
  }

  const URL = "https://api-playforacause.onrender.com/purchase"

  try {
    await axios.post(URL, cart, config)

    alert("Compra efetuada com sucesso")

    router.push("/")

  } catch (error: any) {
    console.log(error.response.data)
  }
}

export async function getUserPurchases() {
  const tokenString = localStorage.getItem('token');
  const token = tokenString !== null ? JSON.parse(tokenString) : null

  if (!token) {
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const URL = "https://api-playforacause.onrender.com/purchase"

  try {
    const response = await axios.get(URL, config)
    return response.data
  } catch (error: any) {
    console.log(error.response?.data)
  }
}
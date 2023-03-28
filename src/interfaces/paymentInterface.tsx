import { ICart } from "./cartsInterface";

export interface ICreditCard {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

export interface IAddress {
  cep: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

export interface ICreateAddress {
  cart: ICart[]
  addressInfo: IAddress
}
import axios from "axios";

import { IAddToCart } from "@/interfaces/cartsInterface";

export interface IAddToCartBody {
  addToCartBody: IAddToCart;
  tokenStorage: string | null;
}

export function addToCart({ tokenStorage, addToCartBody }: IAddToCartBody) {
  console.log(tokenStorage, )
}
import { QueryClient } from "react-query";
import { NextRouter } from "next/router";

export interface IAddToCart {
  units: number | undefined;
  productId: number;
}

export interface IAddToCartButtonProps {
  units: number;
  productId: number;
  queryClient: QueryClient;
}

export interface IAddToCartProps {
  addToCartBody: IAddToCart
}

export interface IAddToCartBody {
  addToCartBody: IAddToCart;
  tokenStorage: string | null | undefined;
  router: NextRouter
  queryClient: QueryClient;
}

export interface IAddUnitToCart {
  addToCartBody: IAddToCart;
  tokenStorage: string | null | undefined;
  queryClient: QueryClient;
}

export interface IUpdateUnitToCart {
  cartId: number;
  tokenStorage: string | null | undefined;
  queryClient: any;
}

export interface ICart {
  id: number;
  userId: number;
  productId: number;
  units: number;
  products: {
    id: number;
    name: string
    price: number;
    description: string;
    image: string;
    size: string;
    units: number;
  }
}

export interface IDeleteproductOnCart {
  token: string | null | undefined;
  cartId: number;
  onClick: any
}
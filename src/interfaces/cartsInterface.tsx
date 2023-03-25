export interface IAddToCart {
  units: number;
  productId: number;
}

export interface IAddToCartProps {
  addToCartBody: IAddToCart
}

export interface IAddToCartBody {
  addToCartBody: IAddToCart;
  tokenStorage: string | null | undefined;
  router: any
}
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

export interface ICart {
  id: number;
  userId: number;
  productId: number;
  units: number;
  products: {
    name: string
    price: number;
    description: string;
    image: string;
    size: string;
    units: number;
  }
}
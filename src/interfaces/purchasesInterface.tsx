export interface IPurchases {
  id: number;
  units: number;
  createdAt: Date;
  products: {
    image: string;
    name: string;
    price: number;
    size: string;
  },
  address: {
    city: string;
    street: string;
    number: string;
  }
}
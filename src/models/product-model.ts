// Product Data Type
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Product Data Dummy
export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: 10000,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    price: 15000,
  },
];

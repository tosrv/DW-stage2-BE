// Order Data Type
export interface Order {
  id: number;
  quantity: number;
  productId: number;
}

// Order Data Dummy
export const orders: Order[] = [
  {
    id: 1,
    quantity: 10,
    productId: 1,
  },
  {
    id: 2,
    quantity: 3,
    productId: 2,
  },
];

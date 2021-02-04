import Employee from './employee';

interface Product {
  id: string;
  data: ProductData;
}

export interface ProductData {
  title: string;
  category: string;
  price: number;
  employee: Employee;
  description?: string;
}

export default Product;

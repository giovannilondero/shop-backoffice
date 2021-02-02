import Employee from './employee';

interface Product {
  title: string;
  category: string;
  price: number;
  employee: Employee;
  description?: string;
}

export default Product;

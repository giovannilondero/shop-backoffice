import Employee from './employee';

interface Store {
  id: string;
  data: {
    name: string;
    category: string;
    employees: Employee[];
  };
}

export default Store;

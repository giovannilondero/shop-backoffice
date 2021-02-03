import Employee from './employee';

interface Store {
  id: string;
  data: StoreData;
}

export interface StoreData {
  name: string;
  category: string;
  employees: Employee[];
}

export default Store;

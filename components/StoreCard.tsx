import Store from '../domain/store';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  const { data: storeData } = store;

  return (
    <div>
      <strong>{storeData.name}</strong>
      <br />
      {storeData.category}
      <br />
      <i>{storeData.employees.join()}</i>
    </div>
  );
}

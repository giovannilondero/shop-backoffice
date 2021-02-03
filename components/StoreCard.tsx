import Link from 'next/link';
import Store from '../domain/store';

interface StoreCardProps {
  to?: string;
  store: Store;
}

export default function StoreCard({ store, to = '' }: StoreCardProps) {
  const { data: storeData } = store;

  return (
    <div>
      <Link href={to}>
        <a>
          <strong>{storeData.name}</strong>
          <br />
          {storeData.category}
          <br />
          <i>{storeData.employees.join()}</i>
        </a>
      </Link>
    </div>
  );
}

StoreCard.defaultProps = {
  to: '',
};

import { NextApiRequest, NextApiResponse } from 'next';
import Store from '../../../domain/store';

export default async (req: NextApiRequest, res: NextApiResponse<Store>) => {
  const {
    query: { storeId },
  } = req;
  const response = await fetch(
    `http://us-central1-test-b7665.cloudfunctions.net/api/stores/${storeId}`,
  );
  const responseJson = (await response.json()) as Store;

  res.status(200).json(responseJson);
};

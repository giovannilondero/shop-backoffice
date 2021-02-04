import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../../domain/product';

export default async (req: NextApiRequest, res: NextApiResponse<Product>) => {
  const {
    query: { storeId, productId },
  } = req;
  const response = await fetch(
    `http://us-central1-test-b7665.cloudfunctions.net/api/stores/${storeId}/products/${productId}`,
  );
  const responseJson = (await response.json()) as Product;

  res.status(200).json(responseJson);
};

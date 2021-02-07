import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../../src/domain/product';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Product | {}>,
) => {
  const {
    query: { storeId, productId },
    method,
  } = req;
  const requestURL = `http://us-central1-test-b7665.cloudfunctions.net/api/stores/${storeId}/products/${productId}`;

  switch (method) {
    case 'GET':
      {
        const response = await fetch(requestURL);
        const responseJson = (await response.json()) as Product;

        res.status(200).json(responseJson);
      }
      break;
    case 'DELETE':
      await fetch(requestURL, {
        method,
      });

      res.status(200).json({});
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

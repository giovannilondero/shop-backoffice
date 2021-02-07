import { NextApiRequest, NextApiResponse } from 'next';
import Product, { ProductData } from '../../../../src/domain/product';

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  const {
    query: { storeId },
    method,
    body,
  } = req;
  const requestURL = `http://us-central1-test-b7665.cloudfunctions.net/api/stores/${storeId}/products`;

  switch (method) {
    case 'GET':
      {
        const response = await fetch(requestURL);
        const responseJson = (await response.json()) as Product[];

        res.status(200).json(responseJson);
      }
      break;
    case 'POST':
      {
        const response = await fetch(requestURL, {
          method,
          body,
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });
        const responseText = await response.text();

        res.status(200).json([
          {
            id: responseText,
            data: JSON.parse(body) as ProductData,
          },
        ]);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

import { NextApiRequest, NextApiResponse } from 'next';
import StatsCategory from '../../../../../domain/stats_category';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<StatsCategory[]>,
) => {
  const {
    query: { storeId },
  } = req;
  const response = await fetch(
    `http://us-central1-test-b7665.cloudfunctions.net/api/stores/${storeId}/stats/categories`,
  );
  const responseJson = (await response.json()) as StatsCategory[];

  res.status(200).json(responseJson);
};

import { NextApiRequest, NextApiResponse } from 'next';
import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fid } = req.query;
  
  if (!process.env.NEXT_PUBLIC_NEYNAR_API_KEY) {
    return res.status(500).json({ error: 'NEXT_PUBLIC_NEYNAR_API_KEY is not set in environment variables' });
  }

  const client = new NeynarAPIClient(process.env.NEXT_PUBLIC_NEYNAR_API_KEY);

  try {
    const followingsResponse = await client.fetchUserFollowing(Number(fid), { limit: 100 });
    const followings = followingsResponse.result.users.map(user => ({
      fid: user.fid,
      fname: user.username,
    }));

    res.status(200).json(followings);
  } catch (error) {
    console.error('Error fetching followings:', error);
    res.status(500).json({ error: 'Failed to fetch followings' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fid } = req.query;
  
  if (!process.env.NEYNAR_API_KEY) {
    return res.status(500).json({ error: 'NEYNAR_API_KEY is not set in environment variables' });
  }

  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
  let cursor: string | null = "";
  let users: unknown[] = [];

  try {
    do {
      const result = await client.fetchUserFollowing(Number(fid), {
        limit: 150,
        cursor,
      });
      users = users.concat(result.result.users);
      cursor = result.result.next.cursor;
    } while (cursor !== "" && cursor !== null);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching followings:', error);
    res.status(500).json({ error: 'Failed to fetch followings' });
  }
}

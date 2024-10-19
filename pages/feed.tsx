import { useState, useEffect } from 'react';
import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
import { usePrivy } from '@privy-io/react-auth';

interface FeedItem {
  fid: number;
  fname: string;
  // Add other properties as needed
}

export default function FeedPage() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = usePrivy();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      const farcasterAccount = user.linkedAccounts.find(
        (a) => a.type === 'farcaster'
      );

      if (!farcasterAccount || !farcasterAccount.fid) {
        console.error('No Farcaster account linked or FID not available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/fetchFeed?fid=${farcasterAccount.fid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch feed');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setFeed(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching feed:', error);
        setFeed([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your feed.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Farcaster Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : feed.length > 0 ? (
        <ul className="space-y-4">
          {feed.map((item: FeedItem) => (
            <li key={item.fid} className="bg-white shadow rounded p-4">
              <p className="font-semibold">{item.fname}</p>
              <p className="text-gray-600">FID: {item.fid}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No feed data available</p>
      )}
    </div>
  );
}

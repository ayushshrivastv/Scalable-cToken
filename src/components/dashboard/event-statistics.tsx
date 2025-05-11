"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Create a simple Progress component since we're having import issues
const Progress = ({ value = 0, className = '' }: { value?: number, className?: string }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-800 ${className}`}>
    <div 
      className="h-full bg-white transition-all" 
      style={{ width: `${value}%` }}
    />
  </div>
);

// Types for statistics data
interface EventData {
  eventName: string;
  eventDate: string;
  organizer: string;
  totalSupply: number;
  claimed: number;
  pending: number;
}

export function EventStatistics() {
  // Always call hooks unconditionally first
  const wallet = useWallet();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  // Mark when component is client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Extract wallet properties safely after determining client-side
  const publicKey = isClient ? wallet.publicKey : null;
  const connected = isClient ? wallet.connected : false;

  // Fetch event statistics data when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchEventStats();
    }
  }, [connected, publicKey]);

  // Function to fetch event statistics
  const fetchEventStats = async () => {
    if (!connected || !publicKey) return;
    
    setIsLoading(true);
    try {
      // This would be replaced with actual API calls to fetch statistics
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - would be replaced with actual API response
      setEvents([
        {
          eventName: "Solana 1000x Hackathon",
          eventDate: "2025-05-01",
          organizer: "Superteam",
          totalSupply: 500,
          claimed: 387,
          pending: 113,
        },
        {
          eventName: "Token Web3 Meetup",
          eventDate: "2025-04-15",
          organizer: "Solana Foundation",
          totalSupply: 250,
          claimed: 198,
          pending: 52,
        },
        {
          eventName: "Blockchain Developer Workshop",
          eventDate: "2025-03-22",
          organizer: "Light Protocol",
          totalSupply: 100,
          claimed: 100,
          pending: 0,
        }
      ]);
    } catch (error) {
      console.error("Error fetching event stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Event Token Statistics</h2>
        <Button 
          onClick={fetchEventStats} 
          disabled={isLoading || !connected}
          className="bg-white text-black hover:bg-gray-200 transition-colors"
          size="sm"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {!connected ? (
        <div className="bg-[#121212] rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <p className="text-gray-400 text-center">Connect your wallet to view your event statistics</p>
        </div>
      ) : isLoading ? (
        <div className="bg-[#121212] rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-400">Loading event statistics...</p>
          </div>
        </div>
      ) : events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event, index) => (
            <Card key={index} className="bg-[#121212] border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.eventName}</CardTitle>
                    <CardDescription className="mt-1">
                      {formatDate(event.eventDate)} • {event.organizer}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="bg-gray-800 text-xs font-medium rounded-full px-2.5 py-1">
                      Supply: {event.totalSupply}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Claim Progress</span>
                    <span>{Math.round((event.claimed / event.totalSupply) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(event.claimed / event.totalSupply) * 100} 
                    className="h-2 bg-gray-800" 
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-[#1a1a1a] rounded-md">
                      <p className="text-xs text-gray-400 mb-1">Claimed</p>
                      <p className="text-xl font-bold">{event.claimed}</p>
                    </div>
                    <div className="text-center p-3 bg-[#1a1a1a] rounded-md">
                      <p className="text-xs text-gray-400 mb-1">Pending</p>
                      <p className="text-xl font-bold">{event.pending}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-[#121212] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <p className="text-gray-400 text-center mb-4">No events found</p>
          <Button 
            onClick={fetchEventStats}
            className="bg-white text-black hover:bg-gray-200 transition-colors"
            size="sm"
          >
            Refresh Events
          </Button>
        </div>
      )}
    </div>
  );
}

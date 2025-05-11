"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Create simple table components
const Table = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
);

const TableHeader = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
const TableRow = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`border-b border-gray-800 hover:bg-[#1a1a1a] ${className}`} {...props} />
);
const TableHead = ({ className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={`h-10 px-2 text-left align-middle font-medium text-gray-400 ${className}`} {...props} />
);
const TableCell = ({ className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`p-2 align-middle ${className}`} {...props} />
);

// Create simple Select components
const Select = ({ value, onValueChange, children }: { value: string, onValueChange: (value: string) => void, children: React.ReactNode }) => (
  <div className="relative">
    {children}
  </div>
);

const SelectTrigger = ({ className = '', children }: { className?: string, children: React.ReactNode }) => (
  <button className={`flex h-9 w-full items-center justify-between rounded-md border border-gray-700 bg-[#121212] px-3 py-2 text-sm ${className}`}>
    {children}
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4 opacity-50">
      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path>
    </svg>
  </button>
);

const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>;

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-700 bg-[#121212] shadow-md animate-in fade-in-80 mt-1 w-full">
    <div className="p-1">{children}</div>
  </div>
);

const SelectGroup = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const SelectItem = ({ value, children }: { value: string, children: React.ReactNode }) => (
  <div 
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-[#1a1a1a]" 
    data-value={value}
  >
    {children}
  </div>
);

// Create simple Badge component
const Badge = ({ className = '', children }: { className?: string, children: React.ReactNode }) => (
  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </div>
);
import { Search, Filter } from 'lucide-react';

// Types for recipient data
interface Recipient {
  id: string;
  walletAddress: string;
  name: string | null;
  email: string | null;
  eventName: string;
  claimDate: string;
  status: 'claimed' | 'pending' | 'failed';
}

export function RecipientList() {
  // Always call hooks unconditionally first
  const wallet = useWallet();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState<string>('all');

  // Mark when component is client-side rendered
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Extract wallet properties safely after determining client-side
  const publicKey = isClient ? wallet.publicKey : null;
  const connected = isClient ? wallet.connected : false;

  // Fetch recipient data when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchRecipients();
    }
  }, [connected, publicKey]);

  // Function to fetch recipient list
  const fetchRecipients = async () => {
    if (!connected || !publicKey) return;
    
    setIsLoading(true);
    try {
      // This would be replaced with actual API calls to fetch recipients
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - would be replaced with actual API response
      setRecipients([
        {
          id: '1',
          walletAddress: '8ZKS79CD4YNmhGVEZgwj1iWZnV9y9UtVvjwjQzN4JKfA',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          eventName: 'Solana 1000x Hackathon',
          claimDate: '2025-05-02T14:32:15',
          status: 'claimed'
        },
        {
          id: '2',
          walletAddress: '6ZnYg6V253RjjsTgKW5MVXVEUjwFP8iJgUBMKAWCFsNG',
          name: 'Maria Rodriguez',
          email: 'maria@example.com',
          eventName: 'Solana 1000x Hackathon',
          claimDate: '2025-05-02T15:45:22',
          status: 'claimed'
        },
        {
          id: '3',
          walletAddress: '4j1xp9s2ZV4JxK8zJQxrNRVcLUmMzpXZ5yqJvRPKBJYm',
          name: null,
          email: null,
          eventName: 'Token Web3 Meetup',
          claimDate: '2025-04-15T11:05:33',
          status: 'claimed'
        },
        {
          id: '4',
          walletAddress: '2uvSmG4xnQQSM6So8PTLoFxCLqoYZLaNrNw4BQJFbYLy',
          name: 'John Smith',
          email: 'john@example.com',
          eventName: 'Blockchain Developer Workshop',
          claimDate: '2025-03-22T09:15:44',
          status: 'claimed'
        },
        {
          id: '5',
          walletAddress: '9BRZHVztCYnoBRJTXWMdCjSVt2RzNFNSGR1CjKXPPmV5',
          name: 'Emily Chen',
          email: 'emily@example.com',
          eventName: 'Solana 1000x Hackathon',
          claimDate: '2025-05-03T10:22:18',
          status: 'pending'
        }
      ]);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format wallet address for display (truncate middle)
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Filter recipients based on search term and event filter
  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = 
      searchTerm === '' || 
      recipient.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipient.name && recipient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (recipient.email && recipient.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEvent = 
      eventFilter === 'all' || 
      recipient.eventName === eventFilter;
    
    return matchesSearch && matchesEvent;
  });

  // Get unique event names for the filter
  const eventNames = [...new Set(recipients.map(r => r.eventName))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Token Recipients</h2>
        <Button 
          onClick={fetchRecipients} 
          disabled={isLoading || !connected}
          className="bg-white text-black hover:bg-gray-200 transition-colors"
          size="sm"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {!connected ? (
        <div className="bg-[#121212] rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <p className="text-gray-400 text-center">Connect your wallet to view token recipients</p>
        </div>
      ) : isLoading ? (
        <div className="bg-[#121212] rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-400">Loading recipients...</p>
          </div>
        </div>
      ) : recipients.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by wallet, name or email"
                className="pl-9 bg-[#121212] border-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-56 flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="bg-[#121212] border-gray-800">
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Events</SelectItem>
                    {eventNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#121212] hover:bg-[#1a1a1a]">
                    <TableHead className="w-[180px]">Wallet</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Claimed</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id} className="bg-[#121212] hover:bg-[#1a1a1a]">
                      <TableCell className="font-mono text-xs">
                        {formatWalletAddress(recipient.walletAddress)}
                      </TableCell>
                      <TableCell>
                        {recipient.name ? (
                          <div>
                            <div className="font-medium">{recipient.name}</div>
                            {recipient.email && (
                              <div className="text-sm text-gray-400">{recipient.email}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">Unknown</span>
                        )}
                      </TableCell>
                      <TableCell>{recipient.eventName}</TableCell>
                      <TableCell>{formatDate(recipient.claimDate)}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={
                            recipient.status === 'claimed'
                              ? 'bg-green-900/20 text-green-400 hover:bg-green-900/20'
                              : recipient.status === 'pending'
                              ? 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/20'
                              : 'bg-red-900/20 text-red-400 hover:bg-red-900/20'
                          }
                        >
                          {recipient.status === 'claimed'
                            ? 'Claimed'
                            : recipient.status === 'pending'
                            ? 'Pending'
                            : 'Failed'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-400">
            Showing {filteredRecipients.length} of {recipients.length} recipients
          </div>
        </div>
      ) : (
        <div className="bg-[#121212] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] border border-dashed border-gray-800">
          <p className="text-gray-400 text-center mb-4">No recipients found</p>
          <Button 
            onClick={fetchRecipients}
            className="bg-white text-black hover:bg-gray-200 transition-colors"
            size="sm"
          >
            Refresh Recipients
          </Button>
        </div>
      )}
    </div>
  );
}

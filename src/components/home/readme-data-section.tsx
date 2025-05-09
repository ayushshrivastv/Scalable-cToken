"use client";

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, LockClosedIcon, RocketIcon, CheckIcon } from '@radix-ui/react-icons';
import { BarChartIcon, QrCode, Gift, ChevronDown, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ROUTES } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Data from README
const scalabilityData = [
  {
    title: "Massive Throughput",
    description: "Capable of supporting events with 10,000+ attendees through Light Protocol's compressed NFTs",
    icon: <RocketIcon className="w-6 h-6" />
  },
  {
    title: "Cost Efficiency",
    description: "99.9% reduction in storage costs compared to traditional NFTs (approximately 0.000005 SOL per token vs 0.005 SOL)",
    icon: <BarChartIcon className="w-6 h-6" />
  },
  {
    title: "Network Efficiency",
    description: "Reduces on-chain storage requirements by up to 1000x while maintaining full L1 security guarantees",
    icon: <CodeIcon className="w-6 h-6" />
  },
  {
    title: "Batch Processing",
    description: "Optimized for high-volume token issuance with minimal network congestion",
    icon: <ArrowRightIcon className="w-6 h-6" />
  }
];

const securityData = [
  {
    title: "Wallet Security",
    description: "Wallet connections use standard Solana wallet adapter security practices",
    icon: <LockClosedIcon className="w-6 h-6" />
  },
  {
    title: "No Key Storage",
    description: "No private keys are stored in the application",
    icon: <LockClosedIcon className="w-6 h-6" />
  },
  {
    title: "User Approval",
    description: "All blockchain transactions require explicit user approval",
    icon: <LockClosedIcon className="w-6 h-6" />
  },
  {
    title: "Input Validation",
    description: "Input validation is implemented for all user inputs",
    icon: <LockClosedIcon className="w-6 h-6" />
  }
];

const compressionData = [
  {
    title: "Zero-Knowledge Proofs",
    description: "Enables efficient on-chain storage while preserving cryptographic verification"
  },
  {
    title: "Merkle Tree Implementation",
    description: "Organizes token data in compressed Merkle trees, allowing thousands of tokens to be represented by a single on-chain commitment"
  },
  {
    title: "Concurrent Minting",
    description: "Supports parallel token issuance without chain congestion"
  },
  {
    title: "Verifiable Ownership",
    description: "Despite compression, tokens maintain full verifiability and composability with other Solana protocols"
  }
];

// QR Code & Airdrop Data
const qrCodeAirdropData = [
  {
    title: "Dynamic Generation",
    description: "Each event automatically generates a unique QR code that encodes all necessary transaction data"
  },
  {
    title: "Instant Recognition",
    description: "Compatible with any standard QR scanner or smartphone camera"
  },
  {
    title: "Transaction Embedding",
    description: "QR codes contain pre-formatted transaction instructions for token claiming"
  },
  {
    title: "Wallet Connectivity",
    description: "Scanning initiates an immediate connection to the user's preferred Solana wallet"
  },
  {
    title: "Security Features",
    description: "Each QR code includes validation parameters to prevent unauthorized claims"
  }
];

const airdropData = [
  {
    title: "Bulk Distribution",
    description: "Send tokens to multiple recipients simultaneously with minimal gas costs"
  },
  {
    title: "Targeted Campaigns",
    description: "Create audience segments based on event participation or other criteria"
  },
  {
    title: "Scheduled Releases",
    description: "Set up timed airdrops to coincide with event milestones"
  },
  {
    title: "Claim Verification",
    description: "Monitor real-time claiming statistics through an intuitive dashboard"
  },
  {
    title: "Flexible Allocation",
    description: "Distribute different quantities of tokens to different participant tiers"
  }
];

// Quantified benefits data
const benefitsData = [
  { metric: "Storage Cost per Token", traditional: "~0.005 SOL", compressed: "~0.000005 SOL", improvement: "1000x reduction" },
  { metric: "Tokens per Transaction", traditional: "1", compressed: "Up to 1,000", improvement: "1000x throughput" },
  { metric: "Gas Fees for 10,000 Tokens", traditional: "~50 SOL", compressed: "~0.05 SOL", improvement: "1000x savings" },
  { metric: "Claim Transaction Time", traditional: "2-5 seconds", compressed: "2-5 seconds", improvement: "Equal UX" },
  { metric: "Maximum Event Size", traditional: "~1,000 attendees", compressed: "100,000+ attendees", improvement: "100x scalability" }
];

// Journey data
const organizerJourney = [
  "Connect wallet and access the intuitive dashboard",
  "Create an event with custom branding and metadata",
  "Generate a unique QR code for distribution",
  "Monitor real-time claim statistics"
];

const attendeeJourney = [
  "Scan event QR code with any Phone",
  "Connect Solana wallet with a single tap",
  "Claim compressed token in seconds",
  "Instantly verify token in wallet"
];

// Using a standard function definition instead of FC to avoid React Dev Tools annotations
export function ReadmeDataSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'journey'>('overview');
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Project Overview - EF style header */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Scalable cToken Distribution
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            A high throughput solution for creating and distributing compressed proof-of-participation tokens at scale on Solana blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href={ROUTES.MINT}>
              <Button className="bg-[#0077b5] hover:bg-[#0066a0] text-white px-8 py-6 text-lg rounded-full">
                Create Tokens
              </Button>
            </Link>
            <Link href={ROUTES.CLAIM}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
                Claim Tokens
              </Button>
            </Link>
          </div>
          <a 
            href="https://scalable-c-token-ayushshrivastvs-projects.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#0077b5] hover:text-[#0066a0] underline text-lg font-medium transition-colors"
          >
            View Live Demo
          </a>
        </div>
        
        {/* Tab navigation - EF style */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex items-center gap-2 pb-2 text-lg font-medium transition-all ${activeTab === 'overview' ? 'text-white border-b-2 border-[#0077b5]' : 'text-white/60 hover:text-white'}`}
            >
              <span>Overview</span>
              {activeTab === 'overview' && <ChevronDown className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setActiveTab('benefits')} 
              className={`flex items-center gap-2 pb-2 text-lg font-medium transition-all ${activeTab === 'benefits' ? 'text-white border-b-2 border-[#0077b5]' : 'text-white/60 hover:text-white'}`}
            >
              <span>Quantified Benefits</span>
              {activeTab === 'benefits' && <ChevronDown className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setActiveTab('journey')} 
              className={`flex items-center gap-2 pb-2 text-lg font-medium transition-all ${activeTab === 'journey' ? 'text-white border-b-2 border-[#0077b5]' : 'text-white/60 hover:text-white'}`}
            >
              <span>User Journey</span>
              {activeTab === 'journey' && <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Tab content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* QR Codes Section */}
                <div className="mb-16">
                  <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4 text-[#0077b5]">
                        <QrCode className="w-6 h-6" />
                        <h2 className="text-2xl font-bold text-white">Solana Pay QR Codes</h2>
                      </div>
                      <p className="text-white/70 mb-6">
                        The application leverages Solana Pay's QR code technology to create a seamless claiming experience.
                      </p>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                        <div className="text-white font-medium mb-2">Application Highlights</div>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Built for the ZK Compression Track</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Superteam x Solana 1000x Hackathon</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Real-world event integration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {qrCodeAirdropData.map((item, index) => (
                        <div key={`qr-code-${index}`} className="relative">
                          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-[#0077b5] to-transparent"></div>
                          <div className="pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Airdrop Section */}
                <div className="mb-16">
                  <div className="flex flex-col md:flex-row items-start gap-12">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4 text-[#0077b5]">
                        <Gift className="w-6 h-6" />
                        <h2 className="text-2xl font-bold text-white">Airdrop Capabilities</h2>
                      </div>
                      <p className="text-white/70 mb-6">
                        The platform offers efficient airdrop functionality for event organizers with unprecedented scale.
                      </p>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                        <div className="text-white font-medium mb-2">Technical Stack</div>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Next.js 15 with React 18</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Solana Wallet Adapter</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-[#0077b5] mt-0.5 flex-shrink-0" />
                            <span>Light Protocol for compression</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {airdropData.map((item, index) => (
                        <div key={`airdrop-${index}`} className="relative">
                          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-[#0077b5] to-transparent"></div>
                          <div className="pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Scalability Highlights */}
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#0077b5]">
                    Scalability Highlights
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scalabilityData.map((item, index) => (
                      <div
                        key={`scalability-${index}`}
                        className="bg-black border border-white/10 rounded-xl p-6 hover:border-[#0077b5]/30 transition-all"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 text-[#0077b5]">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-10 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Quantified Benefits
                  </h2>
                  <p className="text-white/70 max-w-3xl mx-auto">
                    Compare the performance improvements of compressed tokens against traditional NFTs
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-6 text-left text-white font-medium">Metric</th>
                        <th className="py-4 px-6 text-left text-white/70 font-medium">Traditional NFTs</th>
                        <th className="py-4 px-6 text-left text-[#0077b5] font-medium">Scalable cToken</th>
                        <th className="py-4 px-6 text-left text-white/70 font-medium">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benefitsData.map((item, index) => (
                        <tr 
                          key={`benefit-${index}`} 
                          className={`border-b border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}
                        >
                          <td className="py-4 px-6 text-white font-medium">{item.metric}</td>
                          <td className="py-4 px-6 text-white/70">{item.traditional}</td>
                          <td className="py-4 px-6 text-[#0077b5]">{item.compressed}</td>
                          <td className="py-4 px-6 text-white/70">{item.improvement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6 text-white">Compression Technology</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {compressionData.map((item, index) => (
                      <div
                        key={`compression-${index}`}
                        className="relative"
                      >
                        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[#0077b5] to-transparent"></div>
                        <div className="pl-6">
                          <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                          <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Journey Tab */}
            {activeTab === 'journey' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-16">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-3 mb-6 text-[#0077b5]">
                        <Users className="w-6 h-6" />
                        <h2 className="text-2xl font-bold text-white">Organizer Journey</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {organizerJourney.map((step, index) => (
                          <div key={`organizer-${index}`} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#0077b5]/20 flex items-center justify-center text-[#0077b5] font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10 w-full">
                              <p className="text-white">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-3 mb-6 text-[#0077b5]">
                        <Zap className="w-6 h-6" />
                        <h2 className="text-2xl font-bold text-white">Attendee Journey</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {attendeeJourney.map((step, index) => (
                          <div key={`attendee-${index}`} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#0077b5]/20 flex items-center justify-center text-[#0077b5] font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10 w-full">
                              <p className="text-white">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-16 text-center">
                  <h3 className="text-xl font-bold mb-6 text-white">Security Considerations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {securityData.map((item, index) => (
                      <div
                        key={`security-${index}`}
                        className="bg-black border border-white/10 rounded-xl p-6 hover:border-[#0077b5]/30 transition-all"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 text-[#0077b5]">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Credits */}
        <div className="max-w-2xl mx-auto text-center mt-20 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-2">Crafted with care by Ayush Srivastava</p>
          <p className="text-white/50 text-sm">Submission for the 1000x Hackathon - Best cToken Integration for Solana Pay</p>
        </div>
      </div>
    </section>
  );
};

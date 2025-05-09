"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { 
  LockClosedIcon, 
  RocketIcon, 
  StackIcon, 
  CalendarIcon, 
  DownloadIcon, 
  CheckCircledIcon 
} from '@radix-ui/react-icons';

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
  hidden: { opacity: 0, y: 30 },
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    variants={itemVariants}
    transition={{ delay }}
    className="flex flex-col h-full bg-black border border-white/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
  >
    <div className="border border-white/30 w-12 h-12 flex items-center justify-center rounded-full mb-5">
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-white/70 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export const FeaturesSection: FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Advanced Features
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Our platform combines the latest in blockchain technology to deliver a seamless token issuance and distribution experience.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<LockClosedIcon className="h-6 w-6" />}
            title="ZK Compression"
            description="Mint compressed tokens that are orders of magnitude cheaper than traditional NFTs while preserving the security of the Solana blockchain."
            delay={0.1}
          />
          <FeatureCard
            icon={<RocketIcon className="h-6 w-6" />}
            title="Solana Pay QR Codes"
            description="Easily distribute tokens to attendees with QR codes that can be scanned with any Solana Pay compatible wallet."
            delay={0.2}
          />
          <FeatureCard
            icon={<StackIcon className="h-6 w-6" />}
            title="Event Metadata"
            description="Attach rich metadata to your tokens including event details, date, location, and custom attributes to create a lasting digital memento."
            delay={0.3}
          />
          <FeatureCard
            icon={<CalendarIcon className="h-6 w-6" />}
            title="Scheduled Airdrops"
            description="Plan and schedule token distributions in advance for seamless event management and coordinated releases."
            delay={0.4}
          />
          <FeatureCard
            icon={<DownloadIcon className="h-6 w-6" />}
            title="Bulk Distribution"
            description="Distribute tokens to thousands of recipients simultaneously with minimal gas fees and maximum efficiency."
            delay={0.5}
          />
          <FeatureCard
            icon={<CheckCircledIcon className="h-6 w-6" />}
            title="Claim Verification"
            description="Verify token claims with cryptographic proof to ensure only authorized recipients can redeem their tokens."
            delay={0.6}
          />
        </motion.div>
      </div>
    </section>
  );
};

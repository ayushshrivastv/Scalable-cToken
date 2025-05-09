"use client";

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { RotatingWords } from '@/components/ui/rotating-words';
import { DataBackground } from '@/components/home/data-background';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const floatingIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const HeroSection: FC = () => {
  // Words for the rotating animation
  const rotatingWords = [
    "High Throughput", 
    "Compressed Tokens", 
    "Solana Pay", 
    "Light Protocol",
    "Zero Knowledge",
    "QR Codes",
    "Airdrops"
  ];

  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-28">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20 pointer-events-none" />
      
      {/* Data visualization background */}
      <DataBackground />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-[10%] w-16 h-16 rounded-full bg-primary/5 dark:bg-primary/10"
          variants={floatingIconVariants}
          initial="hidden"
          animate={["visible", "float"]}
        />
        <motion.div 
          className="absolute bottom-32 left-[15%] w-24 h-24 rounded-full bg-primary/5 dark:bg-primary/10"
          variants={floatingIconVariants}
          initial="hidden"
          animate={["visible", "float"]}
          transition={{ delay: 0.3 }}
        />
        <motion.div 
          className="absolute top-1/3 left-[5%] w-12 h-12 rounded-full bg-primary/5 dark:bg-primary/10"
          variants={floatingIconVariants}
          initial="hidden"
          animate={["visible", "float"]}
          transition={{ delay: 0.6 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 inline-flex">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              Powered by Light Protocol
            </span>
          </motion.div>
          
          {/* Headline with rotating words */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 relative z-10"
          >
            <span className="block mb-2">Scalable cToken Issuance</span>
            <RotatingWords 
              baseText="powered by" 
              words={rotatingWords} 
              interval={2000} 
              className="inline-flex items-baseline"
            />
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Demonstrating scalable compressed token (cToken) issuance and distribution on Solana using Solana Pay, powered by Light Protocol's state compression technology.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={ROUTES.MINT} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-lg"
              >
                Create Event Token
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={ROUTES.CLAIM} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-md"
              >
                Claim Your Token
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats or Trust Indicators */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-1">100%</span>
            <span className="text-sm text-muted-foreground">On-Chain</span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-1">99%</span>
            <span className="text-sm text-muted-foreground">Cost Savings</span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-1">1000x</span>
            <span className="text-sm text-muted-foreground">Throughput</span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-1">Instant</span>
            <span className="text-sm text-muted-foreground">Distribution</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

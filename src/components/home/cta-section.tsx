"use client";

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';
import { ArrowRightIcon } from '@radix-ui/react-icons';

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

export const CTASection: FC = () => {
  return (
    <section className="pt-10 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Black background with subtle gradient */}
            <div className="absolute inset-0 bg-black border border-white/10" />
            
            {/* Content */}
            <div className="relative z-10 px-6 py-12 md:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl md:text-4xl font-bold mb-6 text-white"
                >
                  Ready to get started?
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-muted-foreground mb-10"
                >
                  Create your first proof-of-participation token in minutes and revolutionize your event experience.
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={ROUTES.MINT}>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-lg bg-[#0077b5] text-white font-medium hover:bg-[#0066a0]"
                    >
                      Create Event Token
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href={ROUTES.CLAIM}>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-md border-white text-white hover:bg-white/5"
                    >
                      Claim Your Token
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="absolute bottom-6 left-6 w-16 h-16 rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
              }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

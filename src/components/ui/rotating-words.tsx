"use client";

import { useState, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingWordsProps {
  words: string[];
  interval?: number;
  className?: string;
  baseText?: string;
}

export const RotatingWords: FC<RotatingWordsProps> = ({
  words,
  interval = 3000,
  className = '',
  baseText = ''
}) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className={`inline-flex items-center relative ${className}`}>
      {baseText && <span className="mr-2">{baseText}</span>}
      <div className="h-[1.2em] overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="absolute inline-block text-primary font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ 
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

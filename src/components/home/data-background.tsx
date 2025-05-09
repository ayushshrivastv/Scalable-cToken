"use client";

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  content: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
}

// Data points from README
const readmeData = [
  "Verifiable Ownership",
  "Scalable cToken",
  "Light Protocol",
  "Compression Technology",
  "Solana Pay",
  "Server Components",
  "Optimized Assets",
  "API Routes",
  "Client-side Caching",
  "Wallet Connections",
  "Blockchain Transactions",
  "Input Validation",
  "Compressed Tokens",
  "1000x Throughput",
  "High Performance",
  "Security Practices",
  "No Private Keys Stored",
  "User Approval"
];

export const DataBackground: FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    // Create initial data points
    const points: DataPoint[] = [];
    const totalPoints = 30;
    
    for (let i = 0; i < totalPoints; i++) {
      const dataIndex = Math.floor(Math.random() * readmeData.length);
      points.push({
        content: readmeData[dataIndex],
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.05,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 10 - 5
      });
    }
    
    setDataPoints(points);
    
    // Create animation loop
    const interval = setInterval(() => {
      setDataPoints(prevPoints => 
        prevPoints.map(point => ({
          ...point,
          x: (point.x + 0.05) % 100,
          y: (point.y + 0.02) % 100,
          opacity: Math.max(0.05, Math.min(0.35, point.opacity + (Math.random() * 0.02 - 0.01))),
          rotation: point.rotation + (Math.random() * 0.4 - 0.2)
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dataPoints.map((point, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/10 dark:text-primary/15 font-mono whitespace-nowrap"
          initial={false}
          animate={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            opacity: point.opacity,
            scale: point.scale,
            rotate: point.rotation
          }}
          transition={{ duration: 3, ease: "linear" }}
        >
          {point.content}
        </motion.div>
      ))}
    </div>
  );
};

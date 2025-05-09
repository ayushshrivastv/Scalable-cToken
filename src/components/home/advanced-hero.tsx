"use client";

import { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { gsap } from 'gsap';
import { ReadmeParticles } from '@/components/three/readme-particles';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Words for the transition effect
const transitionWords = [
  "High Throughput", 
  "Compressed Tokens", 
  "Solana Pay", 
  "Light Protocol",
  "Zero Knowledge",
  "QR Codes",
  "Airdrops"
];

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AdvancedHero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Word transition state
  const wordRef = useRef<HTMLSpanElement>(null);
  const currentWord = useRef(0);
  
  useEffect(() => {
    // Main timeline for intro animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Create word transition animation
    const wordAnimation = () => {
      if (!wordRef.current) return;
      
      const words = transitionWords;
      const nextIndex = (currentWord.current + 1) % words.length;
      const currentWordText = words[currentWord.current];
      const nextWordText = words[nextIndex];
      
      const wordTl = gsap.timeline({
        onComplete: () => {
          currentWord.current = nextIndex;
          setTimeout(wordAnimation, 3000); // 3 second delay before next animation
        }
      });
      
      // Slide out current word
      wordTl.to(wordRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (wordRef.current) wordRef.current.textContent = nextWordText;
        }
      });
      
      // Slide in next word
      wordTl.fromTo(wordRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    };
    
    // Animate headline
    if (headlineRef.current) {
      tl.fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
    
    // Start word transition
    if (wordRef.current) {
      wordRef.current.textContent = transitionWords[0];
      tl.fromTo(wordRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
      
      // Set timeout for first transition
      setTimeout(wordAnimation, 3000);
    }
    
    // Animate subheadline
    if (subheadRef.current) {
      tl.fromTo(subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }
    
    // Animate CTA buttons
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }
    
    // Animate stats with scroll trigger
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      {/* Three.js particle system background */}
      <ReadmeParticles />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28 lg:pt-36 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex">
            <span className="inline-flex items-center px-4 py-1 text-xs font-medium rounded-full border border-white/30 text-white">
              Powered by Light Protocol
            </span>
          </div>
          
          {/* Headline with GSAP word transition - Black & White style */}
          <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 text-white">
            Scalable cToken Issuance
          </h1>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 h-14 flex justify-center items-center">
            <span className="mr-2 text-white/70">powered by</span>
            <span ref={wordRef} className="text-white inline-block min-w-40"></span>
          </div>
          
          {/* Subheadline */}
          <p ref={subheadRef} className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
            Demonstrating scalable compressed token (cToken) issuance and distribution on Solana using Solana Pay, powered by Light Protocol's state compression technology.
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href={ROUTES.MINT} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-lg bg-[#0077b5] text-white font-medium px-6 py-3 h-auto hover:bg-[#0066a0]"
              >
                Create Event Token
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={ROUTES.CLAIM} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto group transition-all hover:translate-y-[-2px] hover:shadow-md border-white text-white hover:bg-white/10 font-medium px-6 py-3 h-auto"
              >
                Claim Your Token
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats or Trust Indicators */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">100%</span>
            <span className="text-sm text-white/70 font-medium">On-Chain</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">99%</span>
            <span className="text-sm text-white/70 font-medium">Cost Savings</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">1000x</span>
            <span className="text-sm text-white/70 font-medium">Throughput</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">Instant</span>
            <span className="text-sm text-white/70 font-medium">Distribution</span>
          </div>
        </div>
      </div>
    </section>
  );
};

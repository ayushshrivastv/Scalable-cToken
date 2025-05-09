"use client";

import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';

interface WordTransitionProps {
  words: string[];
  baseText?: string;
  className?: string;
  interval?: number;
}

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

export const WordTransition: FC<WordTransitionProps> = ({
  words,
  baseText = '',
  className = '',
  interval = 3000
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const wordContainer = containerRef.current.querySelector('.word-container');
    if (!wordContainer) return;
    
    const updateWord = () => {
      if (!wordContainer) return;
      
      if (timeline.current) {
        timeline.current.kill();
      }
      
      const tl = gsap.timeline();
      timeline.current = tl;
      
      // Get current and next word
      const currentWord = words[currentIndex.current];
      currentIndex.current = (currentIndex.current + 1) % words.length;
      const nextWord = words[currentIndex.current];
      
      // Create split text elements
      const currentElement = document.createElement('div');
      currentElement.className = 'absolute inset-0 text-primary';
      currentElement.textContent = currentWord;
      wordContainer.appendChild(currentElement);
      
      const nextElement = document.createElement('div');
      nextElement.className = 'absolute inset-0 text-primary opacity-0';
      nextElement.textContent = nextWord;
      wordContainer.appendChild(nextElement);
      
      // Create SplitText instances
      if (typeof SplitText !== 'undefined') {
        const currentSplit = new SplitText(currentElement, { type: "chars" });
        const nextSplit = new SplitText(nextElement, { type: "chars" });
        
        // Animate out current word, char by char
        tl.to(currentSplit.chars, {
          opacity: 0,
          y: -20,
          stagger: 0.03,
          ease: "power2.inOut",
          duration: 0.5
        });
        
        // Animate in next word, char by char
        tl.to(nextElement, { opacity: 1, duration: 0.1 }, "-=0.3");
        tl.fromTo(nextSplit.chars, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.03, 
            ease: "power2.out",
            duration: 0.5
          }, 
          "-=0.3"
        );
        
        // Clean up old elements
        tl.add(() => {
          while (wordContainer.children.length > 1) {
            wordContainer.removeChild(wordContainer.firstChild!);
          }
        });
      } else {
        // Fallback if SplitText isn't available (SSR and such)
        tl.to(currentElement, {
          opacity: 0,
          y: -20,
          ease: "power2.inOut",
          duration: 0.5
        });
        
        tl.to(nextElement, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.5
        }, "-=0.2");
        
        // Clean up old elements
        tl.add(() => {
          while (wordContainer.children.length > 1) {
            wordContainer.removeChild(wordContainer.firstChild!);
          }
        });
      }
    };
    
    // Initial word setup
    const initialElement = document.createElement('div');
    initialElement.className = 'absolute inset-0 text-primary';
    initialElement.textContent = words[currentIndex.current];
    wordContainer.appendChild(initialElement);
    
    // Set up interval
    const wordInterval = setInterval(updateWord, interval);
    
    // Cleanup
    return () => {
      clearInterval(wordInterval);
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, [words, interval]);
  
  return (
    <div ref={containerRef} className={`inline-flex items-center ${className}`}>
      {baseText && <span className="mr-2">{baseText}</span>}
      <div className="relative inline-block min-w-52">
        <div className="invisible">{words[0]}</div>
        <div className="word-container absolute inset-0"></div>
      </div>
    </div>
  );
};

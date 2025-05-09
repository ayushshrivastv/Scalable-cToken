"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';

// Data from README
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

// Particle system component
const Particles = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const count = readmeData.length;
  const pointsRef = useRef<THREE.Points>(null);
  const textRefs = useRef<any[]>([]);
  
  // Create particle system
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    // Black and white color scheme
    const textColor = new THREE.Color(0xffffff); // White
    const particleColor = new THREE.Color(0x888888); // Light gray
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 5 + Math.random() * 5;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 5;                // y
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta); // z
      
      scales[i] = Math.random() * 0.5 + 0.5;
      
      // Set color
      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;
    }
    
    return {
      positions,
      scales,
      colors,
      textColor
    };
  }, [count, isDark]);
  
  // Setup camera and animation
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 15);
    
    // GSAP animation
    const timeline = gsap.timeline();
    
    // Animate particles appearing
    if (pointsRef.current) {
      timeline.fromTo(
        pointsRef.current.material,
        { opacity: 0 },
        { opacity: 0.5, duration: 2, ease: "power2.inOut" }
      );
      
      // Animate camera
      timeline.to(
        camera.position,
        { z: 12, duration: 5, ease: "power1.inOut", repeat: -1, yoyo: true },
        "-=1"
      );
    }
    
    // Animate texts
    textRefs.current.forEach((textRef, i) => {
      timeline.fromTo(
        textRef.position,
        { y: -2 },
        { 
          y: 0, 
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          delay: i * 0.1
        },
        "-=2"
      );
      
      // Use type assertion for material access
      if (textRef && (textRef as any).material) {
        timeline.fromTo(
          (textRef as any).material,
          { opacity: 0 },
          { 
            opacity: 0.7,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        );
      }
    });
    
    return () => {
      timeline.kill();
    };
  }, [camera]);
  
  // Animate the particle system
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.025;
    }
    
    // Animate text
    textRefs.current.forEach((textRef, i) => {
      textRef.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.2;
      textRef.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.2;
    });
  });
  
  return (
    <>
      {/* Particle system */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
      
      {/* Text labels */}
      {readmeData.map((text, i) => {
        const i3 = i * 3;
        const position = [
          particles.positions[i3],
          particles.positions[i3 + 1],
          particles.positions[i3 + 2]
        ];
        
        return (
          <group
            key={i}
            position={[position[0], position[1], position[2]]}
            ref={(el) => {
              if (el) textRefs.current[i] = el;
            }}
          >
            <Text
              color={particles.textColor}
              fontSize={0.2}
              anchorX="center"
              anchorY="middle"
              material-opacity={0.7}
              material-transparent={true}
            >
              {text}
            </Text>
          </group>
        );
      })}
    </>
  );
};

export const ReadmeParticles = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

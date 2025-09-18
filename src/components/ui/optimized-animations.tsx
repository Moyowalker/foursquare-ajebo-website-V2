import React from 'react';
import { motion } from 'framer-motion';

interface LazyMotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Reduced animation variants for better performance
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export function OptimizedScrollReveal({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={slideUp}
      transition={{ ...slideUp.transition, delay: delay * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function OptimizedFadeIn({ children, className, delay = 0 }: LazyMotionProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ ...fadeIn.transition, delay: delay * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function OptimizedHover({ children, className }: LazyMotionProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Static alternatives for non-critical animations
export function StaticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`transition-transform duration-300 hover:scale-105 ${className}`}>
      {children}
    </div>
  );
}

export function StaticFadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`animate-fade-in ${className}`} style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      {children}
    </div>
  );
}
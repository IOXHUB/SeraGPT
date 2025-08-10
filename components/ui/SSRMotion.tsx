'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SSR-safe wrapper for framer-motion
export function SSRMotion({ children, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div {...(props as any)}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
}

export function SSRAnimatePresence({ children, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <AnimatePresence {...props}>{children}</AnimatePresence>;
}

// Export motion for easy replacement
export { motion } from 'framer-motion';

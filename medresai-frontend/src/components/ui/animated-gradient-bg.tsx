import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedGradientBg = ({
  children,
  className,
  containerClassName,
  colors = [
    'rgba(76, 175, 80, 0.4)',
    'rgba(33, 150, 243, 0.3)',
    'rgba(156, 39, 176, 0.2)',
    'rgba(0, 150, 136, 0.3)',
  ],
  size = 'medium',
  blendMode = 'normal',
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  size?: 'small' | 'medium' | 'large';
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
}) => {
  const sizeMap = {
    small: 600,
    medium: 1000,
    large: 1400,
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.1, 1.2, 1.1, 1],
              opacity: [0.3, 0.5, 0.7, 0.5, 0.3],
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 20 + index * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              background: color,
              width: sizeMap[size] + index * 100,
              height: sizeMap[size] + index * 100,
              borderRadius: '50%',
              filter: 'blur(100px)',
              mixBlendMode: blendMode,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

export default AnimatedGradientBg;
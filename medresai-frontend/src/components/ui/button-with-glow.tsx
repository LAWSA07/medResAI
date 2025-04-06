import React from "react";
import { motion } from "framer-motion";

export function ButtonWithGlow({
  children,
  onClick,
  className,
  glowColor = "rgba(76, 175, 80, 0.6)",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  [key: string]: any;
}) {
  return (
    <div className="relative" style={{ cursor: "pointer" }}>
      <motion.div
        initial={{ opacity: 0.35 }}
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          inset: "-6px",
          background: glowColor,
          borderRadius: "999px",
          filter: "blur(20px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <button
        onClick={onClick}
        className={`relative z-10 rounded-full text-white font-medium whitespace-nowrap bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 px-6 py-3 transition duration-200 text-center ${className}`}
        style={{ position: "relative", zIndex: 10, cursor: "pointer" }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default ButtonWithGlow;
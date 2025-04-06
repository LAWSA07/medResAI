import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const [complete, setComplete] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words) return;

    if (index < words.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + words[index]);
        setIndex(index + 1);
      }, 40); // Speed of text generation

      return () => clearTimeout(timeout);
    } else {
      setComplete(true);
    }
  }, [words, index]);

  return (
    <div className={className}>
      <div className="relative text-left">
        <div className="relative">
          {displayText}
          {!complete && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-block w-1.5 h-5 bg-white/80 ml-1"
            >
              |
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextGenerateEffect;
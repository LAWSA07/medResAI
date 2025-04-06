import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const MovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className = "",
  itemClassName = "",
}: {
  items: React.ReactNode[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speedMap = {
    fast: 25,
    normal: 40,
    slow: 60,
  };

  const addAnimation = () => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    // Calculate the width of all items combined
    const scrollerContentWidth = scrollerContent.reduce(
      (acc, item) => acc + item.clientWidth,
      0
    );

    // If the content is empty or has no width, don't proceed
    if (scrollerContentWidth <= 0) return;

    // Only duplicate if we have actual content
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    const directionValue = direction === "left" ? -1 : 1;
    // Adjust speed based on content width for better performance
    const calculatedDuration = Math.min(scrollerContentWidth / speedMap[speed], 60);
    const duration = calculatedDuration;

    try {
      const animation = scrollerRef.current.animate(
        [
          {
            transform: `translateX(0)`,
          },
          {
            transform: `translateX(${-scrollerContentWidth * directionValue}px)`,
          },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "linear",
        }
      );

      if (pauseOnHover && containerRef.current) {
        containerRef.current.addEventListener("mouseenter", () => {
          animation.pause();
        });
        containerRef.current.addEventListener("mouseleave", () => {
          animation.play();
        });
      }

      // Clean up animation on unmount
      return () => {
        if (animation) {
          animation.cancel();
        }
        if (containerRef.current) {
          containerRef.current.removeEventListener("mouseenter", () => {});
          containerRef.current.removeEventListener("mouseleave", () => {});
        }
      };
    } catch (error) {
      console.error("Animation error:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative overflow-hidden ${className}`}
      style={{ position: "relative", pointerEvents: "auto" }}
    >
      <motion.ul
        ref={scrollerRef}
        className="flex"
        style={{
          position: "relative",
          zIndex: 10,
          touchAction: "pan-y" // Allow vertical scrolling
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`flex-shrink-0 ${itemClassName}`}
            style={{ paddingRight: "2.5rem", pointerEvents: "auto" }}
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default MovingCards;
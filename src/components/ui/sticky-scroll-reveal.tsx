"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  
  // FIX: Replaced <any> with <HTMLDivElement>
  const ref = useRef<HTMLDivElement>(null); 
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      /* Changed to max-w-7xl and adjusted spacing to allow left side growth */
      className="relative flex justify-between items-start space-x-12 py-20 w-full max-w-7xl mx-auto px-6 md:px-12"
      ref={ref}
    >
      {/* LEFT SIDE: Content portion expanded */}
      <div className="relative flex-1 flex items-start">
        <div className="w-full">
          {content.map((item, index) => (
            /* Increased py and adjusted max-width for better look */
            <div key={item.title + index} className="py-60 first:pt-0 last:pb-80">
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  x: activeCard === index ? 0 : -10,
                }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-black text-[#e8152a] leading-tight"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                }}
                transition={{ duration: 0.5 }}
                /* Increased max-w-2xl to let text breathe horizontally */
                className="text-lg md:text-xl mt-8 max-w-2xl text-slate-400 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Sticky Visual Box made more compact relative to left */}
      <div 
        className={cn(
          "sticky top-[25%] hidden h-[25rem] w-[28rem] shrink-0 overflow-hidden rounded-3xl lg:block shadow-2xl border border-white/10 bg-zinc-900",
          contentClassName
        )}
      >
        <div className="h-full w-full transition-all duration-700 ease-in-out">
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
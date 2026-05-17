// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useMotionValueEvent, useScroll } from "motion/react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";

// export const StickyScroll = ({
//   content,
//   contentClassName,
// }: {
//   content: {
//     title: string;
//     description: string;
//     content?: React.ReactNode | any;
//   }[];
//   contentClassName?: string;
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
//     // target: ref
//     container: ref,
//     offset: ["start start", "end start"],
//   });
//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index / cardLength);
//     const closestBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0,
//     );
//     setActiveCard(closestBreakpointIndex);
//   });

//   const backgroundColors = [
//     "#0f172a", // slate-900
//     "#000000", // black
//     "#171717", // neutral-900
//   ];
//   const linearGradients = [
//     "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
//     "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
//     "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
//   ];

//   const [backgroundGradient, setBackgroundGradient] = useState(
//     linearGradients[0],
//   );

//   useEffect(() => {
//     setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
//   }, [activeCard]);

//   return (
//     <motion.div
//       animate={{
//         backgroundColor: backgroundColors[activeCard % backgroundColors.length],
//       }}
//       className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
//       ref={ref}
//     >
//       <div className="div relative flex items-start px-4">
//         <div className="max-w-2xl">
//           {content.map((item, index) => (
//             <div key={item.title + index} className="my-20">
//               <motion.h2
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-2xl font-bold text-slate-100"
//               >
//                 {item.title}
//               </motion.h2>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-kg mt-10 max-w-sm text-slate-300"
//               >
//                 {item.description}
//               </motion.p>
//             </div>
//           ))}
//           <div className="h-40" />
//         </div>
//       </div>
//       <div
//         style={{ background: backgroundGradient }}
//         className={cn(
//           "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
//           contentClassName,
//         )}
//       >
//         {content[activeCard].content ?? null}
//       </div>
//     </motion.div>
//   );
// };
// "use client";
// import React, { useRef } from "react";
// import { useMotionValueEvent, useScroll } from "framer-motion"; // Note: standard framer-motion import
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// export const StickyScroll = ({
//   content,
//   contentClassName,
// }: {
//   content: {
//     title: string;
//     description: string;
//     content?: React.ReactNode | any;
//   }[];
//   contentClassName?: string;
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
  
//   // FIX 1: Change container to target and track the main window scroll
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start center", "end center"],
//   });

//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index / cardLength);
//     const closestBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0
//     );
//     setActiveCard(closestBreakpointIndex);
//   });

//   return (
//     // FIX 2: Removed h-[30rem] and overflow-y-auto. 
//     // Added min-h-screen to give the scroll logic space to breathe.
//     <motion.div
//       className="relative flex justify-center space-x-10 py-20 w-full"
//       ref={ref}
//     >
//       <div className="div relative flex items-start px-4">
//         <div className="max-w-2xl">
//           {content.map((item, index) => (
//             // FIX 3: Increased py to ensure enough space for the scroll transition
//             <div key={item.title + index} className="py-40 first:pt-0 last:pb-60">
//               <motion.h2
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                   scale: activeCard === index ? 1.05 : 1,
//                 }}
//                 className="text-2xl font-bold text-slate-100"
//               >
//                 {item.title}
//               </motion.h2>
//               <motion.p
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-lg mt-6 max-w-sm text-slate-400 leading-relaxed"
//               >
//                 {item.description}
//               </motion.p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FIX 4: Centered the sticky box vertically in the viewport */}
//       <div className="sticky top-[20%] hidden h-[30rem] w-[35rem] overflow-hidden rounded-3xl lg:block shadow-2xl ">
//         <div className="h-full w-full transition-all duration-500">
//           {content[activeCard].content ?? null}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

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
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  
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
"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import DisplayChessboard from "./DisplayChessboard";

const HeroAnimatedLogo = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div className="relative hidden h-[800px] overflow-visible rounded-full lg:block">
      <div className="absolute -inset-40 top-1/2 -z-30 -translate-y-1/2 translate-x-[-30px] overflow-hidden rounded-full">
        <div className="relative h-full w-full">
          <motion.div
            animate={{ opacity: 1 }}
            className="moving-grid-background absolute h-[200%] w-full"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <div className="shadow-background absolute h-full w-full rounded-full shadow-[inset_0_0_5rem_3rem]" />
        </div>
      </div>
      <DisplayChessboard />
    </div>
  );
};

export default HeroAnimatedLogo;

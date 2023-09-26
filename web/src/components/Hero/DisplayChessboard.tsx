"use client";

import { motion } from "framer-motion";
import logo from "../../../public/assets/logo/logo.png";
import Image from "next/image";

const DisplayChessboard = () => {
  function row(i: number) {
    return Math.floor((63 - i) / 8 + 1);
  }

  return (
    <div className="relative w-[200px] h-[200px] flex flex-wrap rotate-2">
      <motion.div
        animate={{
          y: 260,
          opacity: 1,
          transition: {
            duration: 0.4,
            delay: 0.9,
          },
        }}
        initial={{
          opacity: 0,
          y: 270,
          x: 80,
        }}
        className="absolute z-10"
      >
        <Image src={logo.src} alt="pawn picture" width={200} height={200} />
      </motion.div>
      {[...Array(64)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: 260,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.1 + i / 100,
            },
          }}
          className={`w-[25px] h-[25px] shadow-lg ${
            row(i) % 2 === 0
              ? i % 2 === 0
                ? "bg-[#faf9f6] dark:bg-zinc-800"
                : "bg-amber-500"
              : i % 2 === 0
              ? "bg-amber-500"
              : "bg-[#faf9f6] dark:bg-zinc-800"
          }`}
          initial={{
            opacity: 0,
            y: 270,
            x: 80,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

export default DisplayChessboard;

import React from "react";
import { motion } from "framer-motion";

export default function GameLogo({ size = "large" }) {
  const isLarge = size === "large";
  
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className={`relative ${isLarge ? "w-20 h-20 mb-4" : "w-12 h-12 mb-2"}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl transform rotate-12 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform -rotate-12 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
            <div className="w-2 h-2 bg-white rounded-sm opacity-90"></div>
            <div className="w-2 h-2 bg-white rounded-sm opacity-90"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
          </div>
        </div>
      </motion.div>
      
      <motion.h1 
        className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 ${
          isLarge ? "text-4xl" : "text-2xl"
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        PatternPlay
      </motion.h1>
      
      {isLarge && (
        <motion.p 
          className="text-slate-300 text-sm font-medium mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Strategic Pattern Mastery
        </motion.p>
      )}
    </motion.div>
  );
}
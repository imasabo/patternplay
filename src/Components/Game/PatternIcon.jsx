import React from "react";
import { motion } from "framer-motion";
import { PATTERN_BANK } from "../../utils/patterns.js";

export default function PatternIcon({ pattern, size = "medium", isActive = false }) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };
  
  const patternData = PATTERN_BANK[pattern];
  const patternGrid = patternData ? patternData.display : PATTERN_BANK.L.display;
  
  return (
    <motion.div 
      className={`${sizes[size]} flex flex-col justify-center items-center p-1 rounded-lg ${
        isActive ? "bg-amber-500/20 border border-amber-500/40" : "bg-slate-700/50"
      }`}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="grid grid-cols-3 gap-0.5 pattern-icon">
        {patternGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-1 h-1 rounded-sm ${
                cell === 1 
                  ? isActive 
                    ? "bg-amber-400" 
                    : "bg-slate-300" 
                  : "bg-transparent"
              }`}
            />
          ))
        )}
      </div>
      <div className="text-xs text-slate-400 mt-1 font-medium">{pattern}</div>
    </motion.div>
  );
}
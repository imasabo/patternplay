import React from "react";
import { motion } from "framer-motion";
import PatternIcon from "./PatternIcon.jsx";

export default function PatternDisplay({ 
  patterns = ["L", "T", "Z", "Plus"],
  activePattern = null 
}) {
  return (
    <motion.div 
      className="game-card rounded-2xl p-4 shadow-xl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-slate-100 mb-1">Win Patterns</h3>
        <p className="text-sm text-slate-400">Complete any pattern to win</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PatternIcon 
              pattern={pattern} 
              size="large"
              isActive={activePattern === pattern}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
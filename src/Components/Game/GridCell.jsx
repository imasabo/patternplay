import React from "react";
import { motion } from "framer-motion";

export default function GridCell({ 
  row, 
  col, 
  value, 
  onClick, 
  isHighlighted = false,
  size = "medium" 
}) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };
  
  const handleClick = () => {
    if (value === "" && onClick) {
      onClick(row, col);
    }
  };
  
  return (
    <motion.div
      className={`${sizes[size]} grid-cell rounded-lg cursor-pointer relative overflow-hidden touch-manipulation ${
        isHighlighted ? "ring-2 ring-amber-400 ring-opacity-60" : ""
      }`}
      onClick={handleClick}
      onTouchStart={(e) => e.preventDefault()}
      whileHover={value === "" ? { scale: 1.05 } : {}}
      whileTap={value === "" ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {value === "red" && (
        <motion.div 
          className="w-full h-full bg-red-500 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        />
      )}
      
      {value === "blue" && (
        <motion.div 
          className="w-full h-full bg-blue-500 rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        />
      )}
      
      {value === "" && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-lg" />
      )}
    </motion.div>
  );
}
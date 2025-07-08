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
    if ((!value || value === "") && onClick) {
      onClick(row, col);
    }
  };
  
  // Handle legacy string format for backward compatibility
  const isLegacyFormat = typeof value === 'string' && (value === 'red' || value === 'blue');
  
  // Get tile properties
  const tileColor = isLegacyFormat 
    ? (value === 'red' ? '#FF4136' : '#B10DC9')
    : (value?.color || '#666666');
  
  const tileShape = isLegacyFormat 
    ? (value === 'red' ? 'circle' : 'square')
    : (value?.shape || 'circle');
  
  const isEmpty = !value || value === "" || value === null;
  
  return (
    <motion.div
      className={`${sizes[size]} grid-cell rounded-lg cursor-pointer relative overflow-hidden touch-manipulation ${
        isHighlighted ? "ring-2 ring-amber-400 ring-opacity-60" : ""
      }`}
      onClick={handleClick}
      onTouchStart={(e) => e.preventDefault()}
      whileHover={isEmpty ? { scale: 1.05 } : {}}
      whileTap={isEmpty ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {!isEmpty && (
        <motion.div 
          className={`w-full h-full shadow-lg ${
            tileShape === 'circle' ? 'rounded-full' : 'rounded-lg'
          }`}
          style={{ backgroundColor: tileColor }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        />
      )}
      
      {isEmpty && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-lg" />
      )}
    </motion.div>
  );
}
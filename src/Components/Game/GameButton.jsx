import React from "react";
import { motion } from "framer-motion";

export default function GameButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "medium", 
  disabled = false,
  className = "" 
}) {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg";
  
  const variants = {
    primary: "game-button text-slate-900 border-0",
    secondary: "bg-slate-700 text-slate-100 border border-slate-600 hover:bg-slate-600 hover:border-slate-500",
    ghost: "bg-transparent text-slate-300 border border-slate-600 hover:bg-slate-800 hover:text-slate-100"
  };
  
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );
}
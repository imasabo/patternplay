import React from "react";
import { motion } from "framer-motion";

export default function PlayerIndicator({ 
  currentPlayer, 
  gameMode = "pvp",
  isGameActive = true 
}) {
  const playerColors = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600"
  };
  
  const playerNames = {
    red: gameMode === "ai" && currentPlayer === "blue" ? "AI Player" : "Player 1",
    blue: gameMode === "ai" && currentPlayer === "blue" ? "AI Player" : "Player 2"
  };
  
  if (!isGameActive) return null;
  
  return (
    <motion.div 
      className="game-card rounded-2xl p-4 shadow-xl text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div 
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${playerColors[currentPlayer]} shadow-lg ${
            currentPlayer === "red" ? "rounded-full" : "rounded-lg"
          }`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            {playerNames[currentPlayer]}'s Turn
          </h3>
          <p className="text-sm text-slate-400">
            {currentPlayer === "red" ? "Red Circles" : "Blue Squares"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
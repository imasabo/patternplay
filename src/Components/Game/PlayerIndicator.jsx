import React from "react";
import { motion } from "framer-motion";
import { 
  getCurrentColor, 
  getCurrentColorName, 
  getNextColor, 
  getNextColorName, 
  getPlayerName,
  getPlayerShape,
  PLAYER_CONFIG 
} from "../../utils/colorRotation.js";

export default function PlayerIndicator({ 
  currentPlayer, 
  gameMode = "pvp",
  isGameActive = true,
  turnCount = 0
}) {
  const playerNames = {
    red: gameMode === "ai" && currentPlayer === "blue" ? "AI Player" : "Player 1",
    blue: gameMode === "ai" && currentPlayer === "blue" ? "AI Player" : "Player 2"
  };
  
  const currentColor = getCurrentColor(currentPlayer, turnCount);
  const currentColorName = getCurrentColorName(currentPlayer, turnCount);
  const nextColor = getNextColor(currentPlayer, turnCount);
  const nextColorName = getNextColorName(currentPlayer, turnCount);
  const playerShape = getPlayerShape(currentPlayer);
  
  if (!isGameActive) return null;
  
  return (
    <motion.div 
      className="game-card rounded-2xl p-4 shadow-xl text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Current player indicator */}
        <div className="flex items-center gap-3">
          <motion.div 
            className={`w-10 h-10 shadow-lg ${
              playerShape === "circle" ? "rounded-full" : "rounded-lg"
            }`}
            style={{ backgroundColor: currentColor }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            key={`${currentPlayer}-${currentColor}`}
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-100">
              {playerNames[currentPlayer]}'s Turn
            </h3>
            <p className="text-sm text-slate-400">
              Current: {currentColorName} {playerShape === "circle" ? "●" : "■"}
            </p>
          </div>
        </div>
        
        {/* Next color indicator */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Next:</span>
          <div 
            className={`w-6 h-6 ${
              playerShape === "circle" ? "rounded-full" : "rounded"
            }`}
            style={{ backgroundColor: nextColor }}
          />
          <span>{nextColorName}</span>
        </div>
      </div>
    </motion.div>
  );
}
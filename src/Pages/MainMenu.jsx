import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import GameLogo from "../components/game/GameLogo.jsx";
import GameButton from "../components/game/GameButton.jsx";
import { Play, Bot, Settings, HelpCircle } from "lucide-react";

export default function MainMenu() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <GameLogo size="large" />
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to={createPageUrl("GameSetup")}>
            <GameButton size="large" className="w-full">
              <Play className="w-5 h-5" />
              Start Game
            </GameButton>
          </Link>
          
          <Link to={createPageUrl("GameSetup") + "?mode=ai"}>
            <GameButton variant="secondary" size="large" className="w-full">
              <Bot className="w-5 h-5" />
              Play with AI
            </GameButton>
          </Link>
          
          <Link to={createPageUrl("Settings")}>
            <GameButton variant="ghost" size="large" className="w-full">
              <Settings className="w-5 h-5" />
              Settings
            </GameButton>
          </Link>
          
          <Link to={createPageUrl("HowToPlay")}>
            <GameButton variant="ghost" size="large" className="w-full">
              <HelpCircle className="w-5 h-5" />
              How to Play
            </GameButton>
          </Link>
        </motion.div>
        
        <motion.div 
          className="text-center text-slate-400 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Strategic pattern-building game</p>
          <p>Master the art of deception</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import GameLogo from "../components/game/GameLogo.jsx";
import GameButton from "../components/game/GameButton.jsx";
import PatternIcon from "../components/game/PatternIcon.jsx";
import { ArrowLeft, Target, Eye, Zap } from "lucide-react";

export default function HowToPlay() {
  const navigate = useNavigate();
  
  const rules = [
    {
      icon: Target,
      title: "Objective",
      description: "Be the first player to complete any of the visible target patterns on the 6×6 grid."
    },
    {
      icon: Eye,
      title: "Strategy",
      description: "All patterns are visible to both players. Use deception—build toward one pattern while secretly aiming for another."
    },
    {
      icon: Zap,
      title: "Gameplay",
      description: "Take turns placing your symbol. Red circles for Player 1, blue squares for Player 2. First to complete a pattern wins!"
    }
  ];
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <GameButton 
            variant="ghost" 
            size="small"
            onClick={() => navigate(createPageUrl("MainMenu"))}
          >
            <ArrowLeft className="w-4 h-4" />
          </GameButton>
          <GameLogo size="small" />
          <div className="w-16"></div>
        </div>
        
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">How to Play</h1>
            <p className="text-slate-400">Master the art of strategic deception</p>
          </div>
          
          {/* Rules */}
          <div className="space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                className="game-card rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <rule.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">{rule.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Win Patterns */}
          <motion.div 
            className="game-card rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-4 text-center">Win Patterns</h3>
            <p className="text-slate-300 text-center mb-6">Complete any of these patterns to win the game</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {["L", "T", "Z", "Plus"].map((pattern) => (
                <div key={pattern} className="text-center">
                  <PatternIcon pattern={pattern} size="large" />
                  <p className="text-sm text-slate-400 mt-2">{pattern}-Shape</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Pro Tips */}
          <motion.div 
            className="game-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-4">Pro Tips</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Watch your opponent's moves carefully—they might be bluffing!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Block your opponent while secretly building your own pattern</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Sometimes the best defense is a good offense</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Keep multiple pattern options open for flexibility</span>
              </li>
            </ul>
          </motion.div>
          
          {/* CTA */}
          <div className="text-center">
            <GameButton 
              size="large"
              onClick={() => navigate(createPageUrl("GameSetup"))}
            >
              Start Playing
            </GameButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
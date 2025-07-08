import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import { Game } from "../entities/Game.js";
import GameLogo from "../components/game/GameLogo.jsx";
import GameButton from "../components/game/GameButton.jsx";
import PatternIcon from "../components/game/PatternIcon.jsx";
import { ArrowLeft, Shuffle, Users, Bot } from "lucide-react";

export default function GameSetup() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const initialMode = urlParams.get('mode') || 'pvp';
  
  const [gameMode, setGameMode] = useState(initialMode);
  const [gridSize, setGridSize] = useState(6);
  const [patternPack, setPatternPack] = useState("classic");
  const [allowPatternRefresh, setAllowPatternRefresh] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  
  const patternPacks = {
    classic: ["L", "T", "Z", "Plus"],
    advanced: ["L", "T", "Z", "Plus"]
  };
  
  const createEmptyBoard = (size) => {
    return Array(size).fill(null).map(() => Array(size).fill(""));
  };
  
  const handleStartGame = async () => {
    setIsStarting(true);
    
    try {
      const newGame = await Game.create({
        board: createEmptyBoard(gridSize),
        current_player: "red",
        game_mode: gameMode,
        grid_size: gridSize,
        pattern_pack: patternPack,
        allow_pattern_refresh: allowPatternRefresh,
        status: "playing"
      });
      
      navigate(createPageUrl("Game") + `?id=${newGame.id}`);
    } catch (error) {
      console.error("Error starting game:", error);
      setIsStarting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
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
          className="game-card rounded-2xl p-6 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center text-slate-100">Game Setup</h2>
          
          {/* Game Mode */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Game Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGameMode("pvp")}
                className={`p-3 rounded-lg border transition-all ${
                  gameMode === "pvp" 
                    ? "border-amber-500 bg-amber-500/20 text-amber-400" 
                    : "border-slate-600 bg-slate-700/50 text-slate-400"
                }`}
              >
                <Users className="w-4 h-4 mx-auto mb-1" />
                <div className="text-sm font-medium">vs Player</div>
              </button>
              <button
                onClick={() => setGameMode("ai")}
                className={`p-3 rounded-lg border transition-all ${
                  gameMode === "ai" 
                    ? "border-amber-500 bg-amber-500/20 text-amber-400" 
                    : "border-slate-600 bg-slate-700/50 text-slate-400"
                }`}
              >
                <Bot className="w-4 h-4 mx-auto mb-1" />
                <div className="text-sm font-medium">vs AI</div>
              </button>
            </div>
          </div>
          
          {/* Grid Size */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Grid Size</label>
            <div className="flex items-center justify-center">
              <div className="text-lg font-semibold text-slate-100">{gridSize} × {gridSize}</div>
            </div>
            <div className="text-xs text-slate-400 text-center">Standard competitive size</div>
          </div>
          
          {/* Pattern Pack Preview */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">Pattern Pack</label>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-100">Classic Pack</span>
                <span className="text-xs text-slate-400">4 patterns</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {patternPacks[patternPack].map((pattern) => (
                  <PatternIcon key={pattern} pattern={pattern} size="small" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Pattern Refresh Option */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Allow Pattern Refresh
                </label>
                <p className="text-xs text-slate-400">Mid-game pattern change</p>
              </div>
              <button
                onClick={() => setAllowPatternRefresh(!allowPatternRefresh)}
                className={`w-12 h-6 rounded-full transition-all ${
                  allowPatternRefresh 
                    ? "bg-amber-500" 
                    : "bg-slate-600"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${
                  allowPatternRefresh ? "translate-x-7" : "translate-x-1"
                }`} />
              </button>
            </div>
            {allowPatternRefresh && (
              <div className="text-xs text-amber-400 bg-amber-500/10 p-2 rounded-lg">
                <Shuffle className="w-3 h-3 inline mr-1" />
                Both players can request new patterns during the game
              </div>
            )}
          </div>
        </motion.div>
        
        <GameButton 
          size="large" 
          className="w-full"
          onClick={handleStartGame}
          disabled={isStarting}
        >
          {isStarting ? "Starting Game..." : "Start Playing"}
        </GameButton>
      </motion.div>
    </div>
  );
}
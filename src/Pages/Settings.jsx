import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import GameLogo from "../components/game/GameLogo.jsx";
import GameButton from "../components/game/GameButton.jsx";
import { ArrowLeft, Volume2, VolumeX, Palette, Smartphone } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");
  
  const settings = [
    {
      icon: soundEnabled ? Volume2 : VolumeX,
      title: "Sound Effects",
      description: "Play audio feedback during gameplay",
      value: soundEnabled,
      onChange: setSoundEnabled
    },
    {
      icon: Smartphone,
      title: "Haptic Feedback",
      description: "Vibrate on touch interactions",
      value: hapticEnabled,
      onChange: setHapticEnabled
    }
  ];
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
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
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
            <p className="text-slate-400">Customize your gaming experience</p>
          </div>
          
          {/* Settings */}
          <motion.div 
            className="game-card rounded-2xl p-6 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {settings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700/50 rounded-lg">
                    <setting.icon className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-medium">{setting.title}</h3>
                    <p className="text-slate-400 text-sm">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setting.onChange(!setting.value)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    setting.value 
                      ? "bg-amber-500" 
                      : "bg-slate-600"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-all ${
                    setting.value ? "translate-x-7" : "translate-x-1"
                  }`} />
                </button>
              </div>
            ))}
            
            {/* Theme Selection */}
            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-slate-700/50 rounded-lg">
                  <Palette className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-slate-100 font-medium">Theme</h3>
                  <p className="text-slate-400 text-sm">Choose your preferred theme</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    theme === "dark" 
                      ? "border-amber-500 bg-amber-500/20 text-amber-400" 
                      : "border-slate-600 bg-slate-700/50 text-slate-400"
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    theme === "light" 
                      ? "border-amber-500 bg-amber-500/20 text-amber-400" 
                      : "border-slate-600 bg-slate-700/50 text-slate-400"
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Game Info */}
          <motion.div 
            className="game-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-4">About</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Created by</span>
                <span>PatternPlay Team</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
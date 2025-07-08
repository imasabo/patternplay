
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils.js";
import { Game } from "../entities/Game.js";
import { InvokeLLM } from "../integrations/Core.js";
import GameBoard from "../components/game/GameBoard.jsx";
import PatternDisplay from "../components/game/PatternDisplay.jsx";
import PlayerIndicator from "../components/game/PlayerIndicator.jsx";
import GameButton from "../components/game/GameButton.jsx";
import { ArrowLeft, RotateCcw, Shuffle } from "lucide-react";

export default function GamePage() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const [isProcessingMove, setIsProcessingMove] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
  
  const patterns = ["L", "T", "Z", "Plus"];
  
  useEffect(() => {
    loadGame();
  }, [gameId]);
  
  const loadGame = async () => {
    if (!gameId) {
      navigate(createPageUrl("MainMenu"));
      return;
    }
    
    try {
      const gameData = await Game.list();
      const currentGame = gameData.find(g => g.id === gameId);
      
      if (currentGame) {
        setGame(currentGame);
        if (currentGame.status === "finished") {
          setShowVictory(true);
          if (currentGame.winning_pattern && currentGame.winning_pattern.positions) {
            setHighlightedCells(currentGame.winning_pattern.positions);
          }
        }
      } else {
        navigate(createPageUrl("MainMenu"));
      }
    } catch (error) {
      console.error("Error loading game:", error);
      navigate(createPageUrl("MainMenu"));
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkWinCondition = (board, player) => {
    const winPatterns = {
      L: [
        [{r: 0, c: 0}, {r: 1, c: 0}, {r: 2, c: 0}, {r: 2, c: 1}],
        [{r: 0, c: 0}, {r: 0, c: 1}, {r: 0, c: 2}, {r: 1, c: 0}],
        [{r: 0, c: 1}, {r: 1, c: 1}, {r: 2, c: 1}, {r: 2, c: 0}],
        [{r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 0, c: 2}]
      ],
      T: [
        [{r: 0, c: 0}, {r: 0, c: 1}, {r: 0, c: 2}, {r: 1, c: 1}],
        [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 1}],
        [{r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 0, c: 1}],
        [{r: 0, c: 0}, {r: 1, c: 0}, {r: 2, c: 0}, {r: 1, c: 1}]
      ],
      Z: [
        [{r: 0, c: 0}, {r: 0, c: 1}, {r: 1, c: 1}, {r: 1, c: 2}],
        [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 0}],
        [{r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 1}, {r: 2, c: 2}],
        [{r: 0, c: 2}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 2, c: 1}]
      ],
      Plus: [
        [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 2, c: 1}]
      ]
    };
    
    for (const [patternName, variations] of Object.entries(winPatterns)) {
      for (const variation of variations) {
        for (let startRow = 0; startRow <= board.length - 3; startRow++) {
          for (let startCol = 0; startCol <= board[0].length - 3; startCol++) {
            const match = variation.every(pos => {
              const row = startRow + pos.r;
              const col = startCol + pos.c;
              return row < board.length && col < board[0].length && board[row][col] === player;
            });
            
            if (match) {
              return {
                pattern: patternName,
                positions: variation.map(pos => ({
                  row: startRow + pos.r,
                  col: startCol + pos.c
                }))
              };
            }
          }
        }
      }
    }
    
    return null;
  };
  
  const handleCellClick = async (row, col) => {
    if (!game || game.status !== "playing" || isProcessingMove) return;
    
    setIsProcessingMove(true);
    
    try {
      const newBoard = game.board.map(boardRow => [...boardRow]);
      newBoard[row][col] = game.current_player;
      
      const winResult = checkWinCondition(newBoard, game.current_player);
      
      if (winResult) {
        setHighlightedCells(winResult.positions);
        const updatedGame = await Game.update(game.id, {
          board: newBoard,
          status: "finished",
          winner: game.current_player,
          winning_pattern: winResult
        });
        setGame(updatedGame);
        setShowVictory(true);
      } else {
        const nextPlayer = game.current_player === "red" ? "blue" : "red";
        const updatedGame = await Game.update(game.id, {
          board: newBoard,
          current_player: nextPlayer
        });
        setGame(updatedGame);
        
        if (game.game_mode === "ai" && nextPlayer === "blue") {
          setTimeout(() => handleAIMove(newBoard), 1000);
        }
      }
    } catch (error) {
      console.error("Error making move:", error);
    } finally {
      setIsProcessingMove(false);
    }
  };
  
  const handleAIMove = async (currentBoard) => {
    try {
      const prompt = `You are playing PatternPlay, a strategic game. The current board state is: ${JSON.stringify(currentBoard)}. 
      
      You are the blue player (squares). Available patterns to win: L, T, Z, Plus shapes.
      
      Rules:
      - Each pattern requires 4-5 connected cells
      - You can win by completing any pattern
      - Block the red player from winning
      - Look for strategic opportunities
      
      Analyze the board and choose your next move. Return the row and column (0-5) as a JSON object.`;
      
      const aiResponse = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            row: { type: "number" },
            col: { type: "number" },
            reasoning: { type: "string" }
          }
        }
      });
      
      const { row, col } = aiResponse;
      
      if (row >= 0 && row < 6 && col >= 0 && col < 6 && currentBoard[row][col] === "") {
        const newBoard = currentBoard.map(boardRow => [...boardRow]);
        newBoard[row][col] = "blue";
        
        const winResult = checkWinCondition(newBoard, "blue");
        
        if (winResult) {
          setHighlightedCells(winResult.positions);
          const updatedGame = await Game.update(game.id, {
            board: newBoard,
            status: "finished",
            winner: "blue",
            winning_pattern: winResult
          });
          setGame(updatedGame);
          setShowVictory(true);
        } else {
          const updatedGame = await Game.update(game.id, {
            board: newBoard,
            current_player: "red"
          });
          setGame(updatedGame);
        }
      }
    } catch (error) {
      console.error("Error with AI move:", error);
    }
  };
  
  const handleRematch = async () => {
    try {
      // Reset game state first
      setShowVictory(false);
      setHighlightedCells([]);
      setIsProcessingMove(false);
      
      const newGame = await Game.create({
        board: Array(6).fill(null).map(() => Array(6).fill("")),
        current_player: "red",
        game_mode: game.game_mode,
        grid_size: game.grid_size,
        pattern_pack: game.pattern_pack,
        allow_pattern_refresh: game.allow_pattern_refresh,
        status: "playing"
      });
      
      // Update the current game state with the new game
      setGame(newGame);
      
      // Update the URL without triggering a full navigation
      window.history.replaceState(null, '', createPageUrl("Game") + `?id=${newGame.id}`);
    } catch (error) {
      console.error("Error starting rematch:", error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading game...</p>
        </div>
      </div>
    );
  }
  
  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Game not found</p>
          <GameButton onClick={() => navigate(createPageUrl("MainMenu"))}>
            Return to Menu
          </GameButton>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <GameButton 
            variant="ghost" 
            size="small"
            onClick={() => navigate(createPageUrl("MainMenu"))}
          >
            <ArrowLeft className="w-4 h-4" />
          </GameButton>
          
          <div className="flex items-center gap-2">
            {game.allow_pattern_refresh && (
              <GameButton variant="ghost" size="small">
                <Shuffle className="w-4 h-4" />
              </GameButton>
            )}
            <GameButton 
              variant="ghost" 
              size="small"
              onClick={handleRematch}
            >
              <RotateCcw className="w-4 h-4" />
            </GameButton>
          </div>
        </div>
        
        {/* Game Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Patterns */}
          <div className="lg:order-1">
            <PatternDisplay patterns={patterns} />
          </div>
          
          {/* Center - Game Board */}
          <div className="lg:order-2 space-y-4">
            <PlayerIndicator 
              currentPlayer={game.current_player} 
              gameMode={game.game_mode}
              isGameActive={game.status === "playing"}
            />
            
            <GameBoard 
              board={game.board}
              onCellClick={handleCellClick}
              highlightedCells={highlightedCells}
            />
          </div>
          
          {/* Right Side - Game Info */}
          <div className="lg:order-3">
            <div className="game-card rounded-2xl p-4 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Game Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <span className="text-slate-100">
                    {game.game_mode === "ai" ? "vs AI" : "vs Player"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Grid:</span>
                  <span className="text-slate-100">{game.grid_size}×{game.grid_size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Patterns:</span>
                  <span className="text-slate-100">{patterns.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Victory Modal */}
      <AnimatePresence>
        {showVictory && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="game-card rounded-2xl p-8 max-w-md w-full text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h2 className="text-3xl font-bold text-slate-100 mb-2">
                {game.winner === "red" ? "Player 1" : 
                 game.game_mode === "ai" && game.winner === "blue" ? "AI Player" : "Player 2"} Wins!
              </h2>
              
              <p className="text-slate-400 mb-6">
                Completed the {game.winning_pattern?.name} pattern
              </p>
              
              <div className="mb-6 flex justify-center">
                <GameBoard 
                  board={game.board}
                  highlightedCells={highlightedCells}
                  onCellClick={null}
                  size="small"
                />
              </div>
              
              <div className="flex gap-3 justify-center">
                <GameButton onClick={handleRematch}>
                  <RotateCcw className="w-4 h-4" />
                  Rematch
                </GameButton>
                <GameButton 
                  variant="secondary"
                  onClick={() => navigate(createPageUrl("MainMenu"))}
                >
                  Menu
                </GameButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
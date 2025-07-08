import React from "react";
import { motion } from "framer-motion";
import GridCell from "./GridCell.jsx";

export default function GameBoard({ 
  board, 
  onCellClick, 
  highlightedCells = [],
  size = "medium" 
}) {
  return (
    <motion.div 
      className="game-card rounded-2xl p-4 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell}
              onClick={onCellClick}
              isHighlighted={highlightedCells.some(
                pos => pos.row === rowIndex && pos.col === colIndex
              )}
              size={size}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
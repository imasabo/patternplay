// Color rotation system for 2-player strategy game

// Player configurations
export const PLAYER_CONFIG = {
  red: {
    name: "Player 1",
    shape: "circle",
    colors: ["#FF4136", "#FF851B"], // Red → Orange
    colorNames: ["Red", "Orange"]
  },
  blue: {
    name: "Player 2", 
    shape: "square",
    colors: ["#B10DC9", "#2ECC40"], // Purple → Green
    colorNames: ["Purple", "Green"]
  }
};

// Get current color for a player based on turn count
export function getCurrentColor(player, turnCount) {
  const config = PLAYER_CONFIG[player];
  if (!config) return "#666666"; // Fallback color
  
  const colorIndex = Math.floor(turnCount / 2) % config.colors.length;
  return config.colors[colorIndex];
}

// Get next color for a player
export function getNextColor(player, turnCount) {
  const config = PLAYER_CONFIG[player];
  if (!config) return "#666666";
  
  const nextColorIndex = (Math.floor(turnCount / 2) + 1) % config.colors.length;
  return config.colors[nextColorIndex];
}

// Get current color name for display
export function getCurrentColorName(player, turnCount) {
  const config = PLAYER_CONFIG[player];
  if (!config) return "Unknown";
  
  const colorIndex = Math.floor(turnCount / 2) % config.colorNames.length;
  return config.colorNames[colorIndex];
}

// Get next color name for display
export function getNextColorName(player, turnCount) {
  const config = PLAYER_CONFIG[player];
  if (!config) return "Unknown";
  
  const nextColorIndex = (Math.floor(turnCount / 2) + 1) % config.colorNames.length;
  return config.colorNames[nextColorIndex];
}

// Get player shape
export function getPlayerShape(player) {
  const config = PLAYER_CONFIG[player];
  return config ? config.shape : "circle";
}

// Get player display name
export function getPlayerName(player) {
  const config = PLAYER_CONFIG[player];
  return config ? config.name : "Unknown Player";
}

// Create a tile object for a player
export function createTile(player, turnCount) {
  return {
    player: player,
    shape: getPlayerShape(player),
    color: getCurrentColor(player, turnCount),
    colorName: getCurrentColorName(player, turnCount)
  };
}

// Check if a board cell contains a player's tile with specific color
export function isPlayerTile(cell, player, color) {
  if (!cell || typeof cell !== 'object') return false;
  return cell.player === player && cell.color === color;
}

// Convert legacy board format to new format
export function convertLegacyBoard(board) {
  if (!board || !Array.isArray(board)) return board;
  
  return board.map(row => 
    row.map(cell => {
      if (!cell || cell === "") return null;
      
      // Convert legacy string format to new object format
      if (typeof cell === 'string') {
        return {
          player: cell, // "red" or "blue"
          shape: getPlayerShape(cell),
          color: cell === "red" ? "#FF4136" : "#B10DC9", // Default colors
          colorName: cell === "red" ? "Red" : "Purple"
        };
      }
      
      return cell; // Already in new format
    })
  );
} 
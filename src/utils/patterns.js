// Pattern bank with classic patterns only
export const PATTERN_BANK = {
  // Classic patterns (4-5 cells)
  L: {
    name: "L",
    variations: [
      [{r: 0, c: 0}, {r: 1, c: 0}, {r: 2, c: 0}, {r: 2, c: 1}],
      [{r: 0, c: 0}, {r: 0, c: 1}, {r: 0, c: 2}, {r: 1, c: 0}],
      [{r: 0, c: 1}, {r: 1, c: 1}, {r: 2, c: 1}, {r: 2, c: 0}],
      [{r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 0, c: 2}]
    ],
    display: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ]
  },
  T: {
    name: "T",
    variations: [
      [{r: 0, c: 0}, {r: 0, c: 1}, {r: 0, c: 2}, {r: 1, c: 1}],
      [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 1}],
      [{r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 0, c: 1}],
      [{r: 0, c: 0}, {r: 1, c: 0}, {r: 2, c: 0}, {r: 1, c: 1}]
    ],
    display: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  Z: {
    name: "Z",
    variations: [
      [{r: 0, c: 0}, {r: 0, c: 1}, {r: 1, c: 1}, {r: 1, c: 2}],
      [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 0}],
      [{r: 1, c: 0}, {r: 1, c: 1}, {r: 2, c: 1}, {r: 2, c: 2}],
      [{r: 0, c: 2}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 2, c: 1}]
    ],
    display: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ]
  },
  Plus: {
    name: "Plus",
    variations: [
      [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}, {r: 2, c: 1}]
    ],
    display: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  },
  X: {
    name: "X",
    variations: [
      [{r: 0, c: 0}, {r: 1, c: 1}, {r: 2, c: 2}, {r: 0, c: 2}, {r: 2, c: 0}],
      [{r: 0, c: 1}, {r: 1, c: 0}, {r: 1, c: 2}, {r: 2, c: 1}, {r: 3, c: 1}],
      [{r: 1, c: 0}, {r: 0, c: 1}, {r: 2, c: 1}, {r: 1, c: 2}, {r: 1, c: 3}],
      [{r: 0, c: 0}, {r: 1, c: 1}, {r: 2, c: 2}, {r: 1, c: 0}, {r: 1, c: 2}]
    ],
    display: [
      [1, 0, 1],
      [0, 1, 0],
      [1, 0, 1]
    ]
  }
};

// Classic patterns only
export const CLASSIC_PATTERNS = ["L", "T", "Z", "Plus", "X"];

// Utility function to get 2 random classic patterns
export function getShuffledClassicPatterns() {
  const shuffled = [...CLASSIC_PATTERNS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2); // Return only 2 patterns
}

// Utility function to check if a pattern is completed on the board
export function checkPatternWin(board, player, patternName) {
  const pattern = PATTERN_BANK[patternName];
  if (!pattern) return null;
  
  // Generate all possible variations for this pattern
  const allVariations = [];
  
  // Add predefined variations
  allVariations.push(...pattern.variations);
  
  // Generate additional rotations and reflections for each predefined variation
  for (const baseVariation of pattern.variations) {
    const generatedVariations = generateAllVariations(baseVariation);
    allVariations.push(...generatedVariations);
  }
  
  // Remove duplicates
  const uniqueVariations = [];
  const seenKeys = new Set();
  
  for (const variation of allVariations) {
    const key = variation.map(pos => `${pos.r},${pos.c}`).sort().join('|');
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueVariations.push(variation);
    }
  }
  
  // Check each unique variation
  for (const variation of uniqueVariations) {
    for (let startRow = 0; startRow <= board.length - 3; startRow++) {
      for (let startCol = 0; startCol <= board[0].length - 3; startCol++) {
        const match = variation.every(pos => {
          const row = startRow + pos.r;
          const col = startCol + pos.c;
          return row < board.length && col < board[0].length && board[row][col] === player;
        });
        
        if (match) {
          return {
            name: patternName,
            positions: variation.map(pos => ({
              row: startRow + pos.r,
              col: startCol + pos.c
            }))
          };
        }
      }
    }
  }
  
  return null;
}

// Utility function to check all patterns for a win
export function checkWinCondition(board, player, patterns) {
  for (const patternName of patterns) {
    const result = checkPatternWin(board, player, patternName);
    if (result) return result;
  }
  return null;
}

// Helper function to generate all rotations and reflections of a pattern
function generateAllVariations(basePattern) {
  const variations = [];
  
  // Get the bounding box of the pattern
  const minRow = Math.min(...basePattern.map(pos => pos.r));
  const maxRow = Math.max(...basePattern.map(pos => pos.r));
  const minCol = Math.min(...basePattern.map(pos => pos.c));
  const maxCol = Math.max(...basePattern.map(pos => pos.c));
  const width = maxCol - minCol + 1;
  const height = maxRow - minRow + 1;
  
  // Normalize the pattern to start at (0,0)
  const normalizedPattern = basePattern.map(pos => ({
    r: pos.r - minRow,
    c: pos.c - minCol
  }));
  
  // Generate all 8 variations (4 rotations × 2 reflections)
  for (let rotation = 0; rotation < 4; rotation++) {
    for (let reflection = 0; reflection < 2; reflection++) {
      let transformedPattern = [...normalizedPattern];
      
      // Apply rotation
      for (let i = 0; i < rotation; i++) {
        transformedPattern = transformedPattern.map(pos => ({
          r: pos.c,
          c: height - 1 - pos.r
        }));
      }
      
      // Apply reflection (horizontal flip)
      if (reflection === 1) {
        transformedPattern = transformedPattern.map(pos => ({
          r: pos.r,
          c: width - 1 - pos.c
        }));
      }
      
      // Normalize again to ensure it starts at (0,0)
      const newMinRow = Math.min(...transformedPattern.map(pos => pos.r));
      const newMinCol = Math.min(...transformedPattern.map(pos => pos.c));
      const finalPattern = transformedPattern.map(pos => ({
        r: pos.r - newMinRow,
        c: pos.c - newMinCol
      }));
      
      // Add to variations if it's unique
      const patternKey = finalPattern.map(pos => `${pos.r},${pos.c}`).sort().join('|');
      if (!variations.some(v => v.key === patternKey)) {
        variations.push({
          positions: finalPattern,
          key: patternKey
        });
      }
    }
  }
  
  return variations.map(v => v.positions);
}

// New color-aware pattern checking functions
export function checkPatternWinWithColor(board, player, patternName, targetColor) {
  const pattern = PATTERN_BANK[patternName];
  if (!pattern) return null;
  
  // Generate all possible variations for this pattern
  const allVariations = [];
  
  // Add predefined variations
  allVariations.push(...pattern.variations);
  
  // Generate additional rotations and reflections for each predefined variation
  for (const baseVariation of pattern.variations) {
    const generatedVariations = generateAllVariations(baseVariation);
    allVariations.push(...generatedVariations);
  }
  
  // Remove duplicates
  const uniqueVariations = [];
  const seenKeys = new Set();
  
  for (const variation of allVariations) {
    const key = variation.map(pos => `${pos.r},${pos.c}`).sort().join('|');
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueVariations.push(variation);
    }
  }
  
  // Check each unique variation
  for (const variation of uniqueVariations) {
    for (let startRow = 0; startRow <= board.length - 3; startRow++) {
      for (let startCol = 0; startCol <= board[0].length - 3; startCol++) {
        const match = variation.every(pos => {
          const row = startRow + pos.r;
          const col = startCol + pos.c;
          const cell = board[row]?.[col];
          
          // Check if cell exists and matches player and color
          return cell && 
                 cell.player === player && 
                 cell.color === targetColor;
        });
        
        if (match) {
          return {
            name: patternName,
            positions: variation.map(pos => ({
              row: startRow + pos.r,
              col: startCol + pos.c
            }))
          };
        }
      }
    }
  }
  
  return null;
}

// Check all patterns for a win with color awareness
export function checkWinConditionWithColor(board, player, patterns, targetColor) {
  for (const patternName of patterns) {
    const result = checkPatternWinWithColor(board, player, patternName, targetColor);
    if (result) return result;
  }
  return null;
}

// Check for any win condition for a player (any color)
export function checkWinConditionAnyColor(board, player, patterns) {
  // Get all possible colors for this player
  const playerColors = player === 'red' ? ['#FF4136', '#FF851B'] : ['#B10DC9', '#2ECC40'];
  
  for (const color of playerColors) {
    const result = checkWinConditionWithColor(board, player, patterns, color);
    if (result) return result;
  }
  
  return null;
} 
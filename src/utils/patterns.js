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
  
  for (const variation of pattern.variations) {
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
// Mock implementation of InvokeLLM for AI moves
export async function InvokeLLM({ prompt, response_json_schema }) {
  // Simple AI logic - find empty cells and pick one randomly
  const boardMatch = prompt.match(/board state is: (\[\[.*?\]\])/);
  if (boardMatch) {
    const boardStr = boardMatch[1];
    const board = JSON.parse(boardStr);
    
    // Find all empty cells
    const emptyCells = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === "") {
          emptyCells.push({ row, col });
        }
      }
    }
    
    // Pick a random empty cell
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return {
        row: randomCell.row,
        col: randomCell.col,
        reasoning: "Random strategic move"
      };
    }
  }
  
  // Fallback
  return {
    row: 0,
    col: 0,
    reasoning: "Default move"
  };
} 
// Mock implementation of Game entity with localStorage persistence
class GameEntity {
  constructor() {
    this.games = this.loadGames();
    this.nextId = this.games.length + 1;
  }

  loadGames() {
    try {
      const stored = localStorage.getItem('patternplay_games');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading games:', error);
      return [];
    }
  }

  saveGames() {
    try {
      localStorage.setItem('patternplay_games', JSON.stringify(this.games));
    } catch (error) {
      console.error('Error saving games:', error);
    }
  }

  async create(gameData) {
    const newGame = {
      id: `game_${this.nextId++}`,
      ...gameData,
      created_at: new Date().toISOString()
    };
    
    this.games.push(newGame);
    this.saveGames();
    return newGame;
  }

  async list() {
    return this.games;
  }

  async update(id, updates) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    if (gameIndex !== -1) {
      this.games[gameIndex] = { ...this.games[gameIndex], ...updates };
      this.saveGames();
      return this.games[gameIndex];
    }
    throw new Error(`Game with id ${id} not found`);
  }

  async delete(id) {
    const gameIndex = this.games.findIndex(g => g.id === id);
    if (gameIndex !== -1) {
      this.games.splice(gameIndex, 1);
      this.saveGames();
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const Game = new GameEntity(); 
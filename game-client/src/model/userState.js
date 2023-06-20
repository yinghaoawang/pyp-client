import Phaser from 'phaser';

const Defaults = {
  MaxUnlockedLevel: 0
};

class UserState extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    this.Defaults = Defaults;
    this._data = {
      maxUnlockedLevel: Defaults.MaxUnlockedLevel
    };
    this.load();
  }

  getCurrentUser() {
    return { id: 9, username: 'guywho-testmygame' };
  }

  // Loads previously saved game state from local storage.
  load() {
    const saveData = JSON.parse(localStorage.getItem('save-data'));
    if (saveData) {
      this._data = saveData;
    }
  }

  // Saves current game state to local storage.
  save() {
    localStorage.setItem('save-data', JSON.stringify(this._data));
  }

  // Clears previously saved game state from local storage
  clearSavedData() {
    localStorage.clear();
  }

  maxUnlockedLevel() {
    return this._data.maxUnlockedLevel;
  }

  completeLevel(levelIndex) {
    this._data.maxUnlockedLevel = Math.max(
      this._data.maxUnlockedLevel,
      levelIndex + 1
    );
    this.save();
  }
}

/**
 * Singleton
 */
const userState = new UserState();

export default userState;

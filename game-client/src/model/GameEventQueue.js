class GameEventQueue {
  constructor(gameState, cardEngine, gameUI) {
    this.eventQueue = [];
    this.gameState = gameState;
    this.cardEngine = cardEngine;
    this.curentEvent = null;
    this.isPaused = false;
  }

  update(game) {
    if (this.isPaused) return;

    if (this.currentEvent == null) {
      if (this.eventQueue.length === 0) {
        console.log('Event queue empty');
        return;
      }

      this.currentEvent = this.eventQueue.shift();
      console.log('Starting new event ' + this.currentEvent.name);
      new Promise((resolve, reject) =>
        this.currentEvent.command(resolve, reject)
      )
        .then(() => {
          this.currentEvent = null;
          game.updateView();
          console.log('Event finished');
        })
        .catch((err) => {
          alert('Fatal: ' + err.message);
          console.error(err);
        });
    }
  }

  checkIsRunning() {
    return this.currentEvent != null;
  }

  enqueue(action) {
    this.eventQueue.push(action);
  }

  peek() {
    return this.eventQueue[0];
  }

  handleEvent(eventName, payload) {
    switch (eventName) {
      case 'error':
        alert(`Error: ${payload.message}`);
        break;
      case 'message':
        alert(payload);
        break;
      case 'drawCard':
        this.enqueue({
          name: eventName,
          command: (resolve, reject) => {
            setTimeout(() => {
              const {
                card,
                metadata: { turn, playerIndex }
              } = payload;

              this.cardEngine.drawCard({ card, turn, playerIndex });
              console.log('Card draw finished');
              resolve();
            }, 150);
          }
        });
        break;
      case 'drawCards':
        const { cards, metadata } = payload;
        for (const card of cards) {
          this.handleEvent('drawCard', { card, metadata });
        }
        break;
      case 'wait':
        this.enqueue({
          name: eventName,
          command: (resolve, reject) => {
            setTimeout(() => {
              resolve(0);
            }, payload.ms);
          }
        });
        break;
      default:
        console.error(`Unrecognized event: ${eventName}`);
        break;
    }
  }
}

export default GameEventQueue;

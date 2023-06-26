import { getBlankCard, getCard } from './cards';

const data = [
  {
    eventName: 'initPlayer',
    payload: {
      id: 1,
      currentPlayerIndex: 0
    }
  },
  {
    eventName: 'drawCards',
    payload: {
      id: 2,
      metadata: {
        turn: 0,
        playerIndex: 1
      },
      cards: [
        getBlankCard(),
        getBlankCard(),
        getBlankCard(),
        getBlankCard(),
        getBlankCard()
      ]
    }
  },
  {
    eventName: 'drawCards',
    payload: {
      id: 3,
      metadata: {
        turn: 0,
        playerIndex: 0
      },
      cards: [getCard(12), getCard(12), getCard(12), getCard(4), getCard(5)]
    }
  },
  {
    eventName: 'wait',
    payload: { id: 4, ms: 500 }
  },
  {
    eventName: 'startGame',
    payload: {
      id: 5,
      startingPlayerIndex: 0
    }
  },
  {
    eventName: 'drawCard',
    payload: {
      id: 6,
      metadata: {
        turn: 1,
        playerIndex: 0
      },
      card: getCard(12)
    }
  }
];

export default data;

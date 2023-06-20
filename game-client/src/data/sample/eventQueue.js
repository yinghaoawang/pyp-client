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
        { unknown: true },
        { unknown: true },
        { unknown: true },
        { unknown: true },
        { unknown: true }
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
      cards: [
        {
          id: 12,
          name: 'Skull',
          attack: 5,
          health: 5,
          energyCost: 1,
          imgUrl: 'https://i.imgur.com/YziVk4A.png'
        },
        {
          id: 12,
          name: 'Skull',
          attack: 5,
          health: 5,
          energyCost: 1,
          imgUrl: 'https://i.imgur.com/YziVk4A.png'
        },
        {
          id: 12,
          name: 'Skull',
          attack: 5,
          health: 5,
          energyCost: 1,
          imgUrl: 'https://i.imgur.com/YziVk4A.png'
        },
        {
          id: 4,
          name: 'Squirthill',
          attack: 1,
          health: 2,
          energyCost: 1,
          imgUrl: 'https://i.imgur.com/lkSiJCc.png',
          ability: {
            name: 'Soak',
            energyCost: 1,
            effects: [
              {
                type: 'applyDebuff',
                debuff: 'Wet',
                target: 'enemy'
              }
            ]
          }
        },
        {
          id: 5,
          name: 'Bikachu',
          attack: 4,
          health: 4,
          energyCost: 2,
          imgUrl: 'https://i.imgur.com/p6LV1tk.png',
          ability: {
            name: 'Shock',
            energyCost: 1,
            effects: [
              {
                if: {
                  condition: {
                    target: {
                      has: {
                        type: 'debuff'
                      }
                    }
                  },
                  effect: {
                    type: 'attack',
                    multiplier: 3
                  }
                },
                else: {
                  effect: {
                    type: 'attack',
                    multiplier: 1.5
                  }
                }
              },
              {
                type: 'removeDebuff',
                debuff: 'Wet',
                target: 'enemy'
              }
            ]
          }
        }
      ]
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
      card: {
        id: 12,
        name: 'Skull',
        attack: 5,
        health: 5,
        energyCost: 1,
        imgUrl: 'https://i.imgur.com/YziVk4A.png'
      }
    }
  }
];

export default data;

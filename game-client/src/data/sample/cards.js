export const cards = [
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
];

export const getCard = (id) => {
  const card = cards.find((c) => c.id === id);
  if (card == null) {
    throw new Error(`Card ${id} does not exist`);
  }
  return card;
};

export const getBlankCard = () => {
  return { unknown: true };
};

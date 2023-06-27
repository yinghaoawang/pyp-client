export const cards = [
  {
    id: 12,
    name: 'Skull',
    attack: 5,
    health: 5,
    energyCost: 1,
    imgUrl: 'https://i.imgur.com/YziVk4A.png',
    description: `Si vis pacem, para bellum - If you want peace, prepare for war.`
  },
  {
    id: 4,
    name: 'Squirthill',
    attack: 1,
    health: 2,
    energyCost: 1,
    imgUrl: 'https://i.imgur.com/lkSiJCc.png',
    description: `Getting wrapped up in worries is bad for your body and spirit. That’s when you must short out your logic circuits and reboot your heart.`,
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
    description: `Who's that pokemon? Its Bikachu! There’s no sense in going out of your way to get somebody to like you. We do have a lot in common.
    The same earth, the same air, the same sky. Maybe if we started looking at what’s the same, instead of looking at what’s different, well, who knows?
    I see now that the circumstances of one’s birth are irrelevant; it is what you do with the gift of life that determines who you are.
    Even If we don’t understand each other, that’s not a reason to reject each other. There are two sides to any argument. Is there one point of view that has all the answers? Give it some thought.`,
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

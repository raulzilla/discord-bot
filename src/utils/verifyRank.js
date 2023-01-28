const configRank = [
  {
    name: "Iron 1",
    id: 3,
  },
  {
    name: "Iron 2",
    id: 4,
  },
  {
    name: "Iron 3",
    id: 5,
  },
  {
    name: "Bronze 1",
    id: 6,
  },
  {
    name: "Bronze 2",
    id: 7,
  },
  {
    name: "Bronze 3",
    id: 8,
  },
  {
    name: "Silver 1",
    id: 9,
  },
  {
    name: "Silver 2",
    id: 10,
  },
  {
    name: "Silver 3",
    id: 11,
  },
  {
    name: "Gold 1",
    id: 12,
  },
  {
    name: "Gold 2",
    id: 13,
  },
  {
    name: "Gold 3",
    id: 14,
  },
  {
    name: "Platinum 1",
    id: 15,
  },
  {
    name: "Platinum 2",
    id: 16,
  },
  {
    name: "Platinum 3",
    id: 17,
  },
  {
    name: "Diamond 1",
    id: 18,
  },
  {
    name: "Diamond 2",
    id: 19,
  },
  {
    name: "Diamond 3",
    id: 20,
  },
  {
    name: "Ascendant 1",
    id: 21,
  },
  {
    name: "Ascendant 2",
    id: 22,
  },
  {
    name: "Ascendant 3",
    id: 23,
  },
  {
    name: "Immortal 1",
    id: 24,
  },
  {
    name: "Immortal 2",
    id: 25,
  },
  {
    name: "Immortal 3",
    id: 26,
  },
  {
    name: "Radiant",
    id: 27,
  },
];

const verifyRank = (rank) => {
  return configRank.filter((item) => {
    if (item.name === rank) {
      return item;
    }
  });
};

export default verifyRank;

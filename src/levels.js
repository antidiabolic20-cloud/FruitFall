// 10 Distinct Worlds Configuration for 100 Levels

export const WORLDS = [
  { id: 1, name: "Sunny Orchard", theme: "orchard", fruits: [1, 2, 3, 4], particle: "🍃" },
  { id: 2, name: "Tropical Cove", theme: "tropical", fruits: [5, 6, 7, 8], particle: "🫧" },
  { id: 3, name: "Citrus Haven", theme: "citrus", fruits: [9, 10, 11, 12], particle: "🌅" },
  { id: 4, name: "Jungle Paradise", theme: "jungle", fruits: [13, 14, 15, 8], particle: "🌿" },
  { id: 5, name: "Berry Blossom", theme: "blossom", fruits: [1, 4, 6, 7, 9], particle: "🌸" },
  { id: 6, name: "Crystal Cavern", theme: "crystal", fruits: [16, 2, 6, 10, 11], particle: "✨" },
  { id: 7, name: "Sugar Candy Land", theme: "candy", fruits: [17, 18, 5, 8, 4], particle: "🍩" },
  { id: 8, name: "Neon Cyber Realm", theme: "neon", fruits: [16, 17, 18, 6, 3], particle: "⚡" },
  { id: 9, name: "Starlight Cosmos", theme: "cosmos", fruits: [16, 19, 2, 7, 10], particle: "🌌" },
  { id: 10, name: "Palace of Gravity", theme: "palace", fruits: [19, 16, 18, 17, 8, 1], particle: "👑" }
];

export function generateLevels() {
  const levels = [];

  for (let id = 1; id <= 100; id++) {
    // Determine World (1-10)
    const worldIdx = Math.min(9, Math.floor((id - 1) / 10));
    const world = WORLDS[worldIdx];

    // Determine Grid Size (rows x cols)
    let rows, cols;
    if (id <= 5) { rows = 4; cols = 4; }
    else if (id <= 15) { rows = 5; cols = 4; }
    else if (id <= 30) { rows = 5; cols = 5; }
    else if (id <= 50) { rows = 6; cols = 5; }
    else if (id <= 70) { rows = 6; cols = 6; }
    else if (id <= 85) { rows = 7; cols = 6; }
    else { rows = 7; cols = 7; }

    const pairCount = Math.floor((rows * cols) / 2);
    const extraMoves = Math.max(2, Math.floor(8 - (id / 15)));
    const maxMoves = Math.max(10, pairCount + extraMoves);

    const baseTarget = pairCount * 100;
    const targetScore = baseTarget + (id * 35);
    const starThresholds = [
      targetScore,
      Math.round(targetScore * 1.3),
      Math.round(targetScore * 1.6)
    ];

    levels.push({
      id,
      name: `${world.name} ${((id - 1) % 10) + 1}`,
      worldId: world.id,
      worldName: world.name,
      worldTheme: world.theme,
      worldParticle: world.particle,
      rows,
      cols,
      fruitTypes: world.fruits,
      maxMoves,
      targetScore,
      starThresholds,
      isBoss: id % 10 === 0
    });
  }

  return levels;
}

export const LEVELS = generateLevels();

export function getLevelConfig(id) {
  const validId = Math.max(1, Math.min(100, id));
  return LEVELS.find(l => l.id === validId) || LEVELS[0];
}

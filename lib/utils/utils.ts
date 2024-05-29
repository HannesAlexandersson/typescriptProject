export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export const winnerPatterns: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

export const SCORES: Record<string, number> = {
    1: 1,
    0: 0,
    2: -1,
  };

export const GAME_MODES: Record<string, string> = {
  easy: "easy",
  medium: "medium",
  difficult: "difficult",
};

export enum GameMode {
  PlayerVsPlayer = 'P1 VS P2',
  PlayerVsComputer = 'P1 VS AI',
  ScoreBoard = 'Score board',
}
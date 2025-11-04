export const getEmptyBoard = () => {
  const ROWS = 6;
  const COLS = 7;
  return Array(COLS)
    .fill(null)
    .map(() => Array(ROWS).fill(null));
}

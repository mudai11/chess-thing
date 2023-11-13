type CustomSquares = {
  options: { [square: string]: { background: string; borderRadius?: string } };
  lastMove: { [square: string]: { background: string } };
  rightClicked: { [square: string]: { backgroundColor: string } | undefined };
  check: { [square: string]: { background: string; borderRadius?: string } };
};

export function squareReducer(
  squares: CustomSquares,
  action: Partial<CustomSquares>
) {
  return { ...squares, ...action };
}

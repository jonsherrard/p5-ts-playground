import p5Types from 'p5';

export const setup = (
  p5: p5Types,
  canvasParentRef: Element,
  width: number,
  height: number
) => {
  p5.createCanvas(width, height).parent(canvasParentRef);
  p5.background('#393E46');
  p5.ellipse(200, 200, 80, 80);
};

export const draw = (p5: p5Types) => {
  const { mouseX, mouseY } = p5;
  if (mouseX > 0 && mouseY > 0) {
    p5.ellipse(mouseX, mouseY, 80, 80);
  }
};

export const title = 'The Alpha Piece';

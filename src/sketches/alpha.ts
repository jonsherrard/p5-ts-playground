import p5Types from 'p5';
import { SetupOptions } from '../App';

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#f7c8d9');
  p5.ellipse(200, 200, 80, 80);
};

export const draw = (p5: p5Types) => {
  p5.background('#f7c8d9');
  const { mouseX, mouseY } = p5;
  if (mouseX > 0 && mouseY > 0) {
    p5.ellipse(mouseX, mouseY, 80, 80);
  }
};

export const title = 'The Alpha Piece';

import p5Types from 'p5';
import { SetupOptions } from '../App';

// Template for new work:

export const title = 'Blank Template';

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#f7c8d9');
};

export const draw = (p5: p5Types) => {
  const { mouseX, mouseY } = p5;
};

import p5Types from 'p5';
import { SetupOptions } from '../App';

// Template for new work.
// 1. Create a new file in src/sketches/ with the name of your new work.
// 2. Copy and paste this template into your new file.
// 3. Rename the title variable to the name of your new work.

export const title = 'Blank Template';

export const setup = (p5: p5Types, options: SetupOptions) => {
  // This will ensure your sketch is always the size of the window.
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#f7c8d9');
};

export const draw = (p5: p5Types) => {
  const { mouseX, mouseY } = p5;
};

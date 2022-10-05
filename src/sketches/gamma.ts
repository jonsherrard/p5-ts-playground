import p5Types from 'p5';
import { SetupOptions } from '../App';

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#f7c8d9');
};

export const draw = (p5: p5Types) => {
  function drawTriangle() {
    p5.beginShape();
    p5.noStroke();
    p5.fill(`rgba(255, 0, 0, 0.5)`);
    p5.vertex(0, 0);
    p5.vertex(0, 10);
    p5.vertex(10, 0);
    p5.endShape();
  }
  const { mouseX, mouseY } = p5;
  if (mouseX > 0 && mouseY > 0) {
    p5.push();
    p5.translate(mouseX, mouseY);
    p5.rotate(p5.frameCount * 3);
    drawTriangle();
    p5.pop();
  }
};

export const title = 'Gamma';

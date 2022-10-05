import p5Types from 'p5';
import { SetupOptions } from '../App';

const colors = ['#f7c8d920', '#FFDFD320', '#957DAD10', '#FF4E5009'];

// function that draws a many sided shape with gaussian distorition of each vertex
function drawShape(
  p5: p5Types,
  sides: number,
  radius: number,
  x: number,
  y: number,
  color: string
) {
  p5.beginShape();
  p5.noStroke();
  p5.fill(color);
  for (let i = 0; i < sides; i++) {
    const angle = p5.map(i, 0, sides, 0, p5.TWO_PI);
    const x1 = x + p5.cos(angle) * radius;
    const y1 = y + p5.sin(angle) * radius;
    const x2 = x1 + p5.randomGaussian() * 4;
    const y2 = y1 + p5.randomGaussian() * 5;
    p5.vertex(x2, y2);
  }
  p5.endShape(p5.CLOSE);
}
let currentColor = colors[0];

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('white');
  // place 1000 drawShapes on the canvas in random positions with random colors from the array
  p5.blendMode(p5.BLEND);
  for (let i = 0; i < 5000; i++) {
    const x = p5.random(p5.width);
    const y = p5.random(p5.height);
    const sides = p5.floor(p5.random(150, 400));
    const radius = p5.random(90, 150);
    const color = colors[p5.floor(p5.random(colors.length))];
    drawShape(p5, sides, radius, x, y, color);
  }
};

export const draw = (p5: p5Types) => {
  // if mouse pressed
  // const { mouseX, mouseY } = p5;
  // // if (p5.mouseIsPressed) {
  // //   if (mouseX > 0 && mouseY > 0) {
  // //     // drawshape once every few seconds
  // //     // drawShape(p5, 500, 10, mouseX, mouseY, currentColor);
  // //   }
  // // }
  // // on mouse click set new color randomly
  // if (p5.mouseIsPressed) {
  //   currentColor = p5.random(colors);
  // }
  // // using noise an a sign wave path draw shap over a line
  // const noise = p5.noise(p5.frameCount / 10);
  // const noiseY = p5.noise(p5.frameCount * 10);
  // const x = p5.width * noise;
  // const y = p5.height * noiseY;
  // drawShape(p5, 1000, 10 * noise, x, y, currentColor);
};

export const title = 'Watercolor Ghost';

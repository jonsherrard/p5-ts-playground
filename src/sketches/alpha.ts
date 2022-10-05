import p5Types from 'p5';
import { SetupOptions } from '../App';

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#f7c8d9');
  for (let x = 0; x < p5.width; x += 5) {
    for (let y = 0; y < p5.height; y += 5) {
      // fill color based on row and column
      // interesting color based on xy position algorithm in hsl
      // fill based on sin curve through hsl space
      const h = (x + y / 1000) % 10000;
      // saturation based on a cos curve
      const s = 100 * Math.abs(Math.cos(((3 * x) / 200) * 0.1));
      const l = 400 + 10 * Math.sin((x * 5 - y) / 100);
      p5.fill(h, s, l, 80);
      // stroke gray with transparency
      p5.noStroke();
      p5.circle(x, y, 4);
      const noise = p5.noise(x / 500, y / 100);
      const noiseX = x + 220 * Math.sin(noise);
      const noiseY = y + -400 * Math.cos(noise);
      // fill rgb based on noise
      // modifify fill color orange based on noise and x position
      const r = 200 * Math.abs(Math.sin(noise));
      const g = 0 * Math.abs(Math.cos(noise));
      const b = 255 * Math.abs(Math.sin(noise));
      p5.fill(r, g, b, 80);
      p5.circle(noiseX - 200, noiseY + 330, 4);
    }
  }
  p5.noLoop();
};

export const draw = (p5: p5Types) => {
  const { mouseX, mouseY } = p5;
  // draw a repeating grid of squares that overflows
  // the canvas

  // if (mouseX > 0 && mouseY > 0) {
  //   // 15 sided polygon with a random color
  //   p5.beginShape();
  //   p5.noStroke();
  //   // transparent reddish color
  //   p5.fill(`rgba(255, 0, 0, 0.5)`);
  //   for (let i = 0; i < 15; i++) {
  //     const angle = p5.map(i, 0, 15, 0, p5.TWO_PI);
  //     const x = mouseX + p5.cos(angle) * 10;
  //     const y = mouseY + p5.sin(angle) * 10;
  //     p5.vertex(x, y);
  //   }
  //   p5.endShape(p5.CLOSE);
  // }
};

export const title = 'Martian Riviera';

import p5Types from 'p5';
import { SetupOptions } from '../App';

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  p5.background('#333');
  p5.noLoop();
  p5.strokeWeight(1);
  // Line color
  p5.stroke(247, 200, 217, 20);
  p5.noFill();
  const points = [];
  for (let i = 0; i < 60; i++) {
    points.push([p5.random(options.width), p5.random(options.height)]);
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        p5.curve(
          points[i][0],
          points[i][1],
          p5.random(options.width),
          p5.random(options.height),
          p5.random(options.width),
          p5.random(options.height),
          points[j][0],
          points[j][1]
        );
      }
    }
  }
  p5.noLoop();
};

export const draw = (p5: p5Types) => {
  return null;
};

export const title = 'Mind Field';

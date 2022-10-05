import p5Types from 'p5';
import { SetupOptions } from '../App';
import { Vector } from 'p5';

// Template for new work:

export const title = 'Fidenza';

const colors = ['#29A691', '#DB4F54', '#3B2B20', '#FCD265', '#B8D9CE'];

//function choose returns a random element from an array
function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

let scl = 3;
let noiseScale = 300;
let space = [20, 30];
let thickness = [3, 4];
let maxSegments = 4;

export const setup = (p5: p5Types, options: SetupOptions) => {
  p5.createCanvas(options.width, options.height);
  // pastel pink background
  p5.background('#EBE4D8');

  p5.angleMode(p5.DEGREES);
  p5.strokeCap(p5.PROJECT);
  p5.noFill();
  p5.noLoop();
};

export const draw = (p5: p5Types) => {
  const width = p5.width;
  const height = p5.height;
  p5.background('#EBE4D8');

  for (
    let y = -height;
    y < height * 2;
    y += p5.random(space[0] * scl, space[1] * scl)
  ) {
    for (
      let x = -width;
      x < width * 2;
      x += p5.random(space[0] * scl, space[1] * scl)
    ) {
      let v = p5.createVector(x, y);
      let lastV = v.copy();
      // const segments = p5.random(maxSegments);
      const segments = 4;
      const sw = p5.round(p5.random(thickness[0] * scl, thickness[1] * scl));
      p5.strokeWeight(sw);
      for (let seg = 0; seg < segments; seg++) {
        p5.stroke(choose(colors));
        p5.beginShape();
        p5.curveVertex(v.x, v.y);
        for (let i = 0; i < p5.random(2, 5); i++) {
          const d =
            360 * p5.noise(v.x / (noiseScale * scl), v.y / (noiseScale * scl));
          const dir = Vector.fromAngle(d).setMag(3 * scl);
          lastV = v.copy();
          v.x += dir.x;
          v.y += dir.y;
          if (v.x > width - 50 || v.x < 50 || v.y > height - 50 || v.y < 50)
            break;
          p5.curveVertex(v.x, v.y);
        }
        p5.curveVertex(v.x, v.y);
        p5.endShape();
        v = lastV.copy();
      }
    }
  }
  p5.strokeWeight(50);
  p5.rect(0, 0, width, height);
};

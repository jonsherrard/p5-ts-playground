import p5Types from 'p5';
import { SetupOptions } from '../App';

// Template for new work.
// 1. Create a new file in src/sketches/ with the name of your new work.
// 2. Copy and paste this template into your new file.
// 3. Rename the title variable to the name of your new work.

export const title = 'Flow-ers';

let num = 2000;
let noiseScale = 500,
  noiseStrength = 1;
let particles = [num] as any;

export const setup = (p5: p5Types, options: SetupOptions) => {
  // This will ensure your sketch is always the size of the window.
  p5.createCanvas(options.width, options.height);
  p5.noStroke();
  for (let i = 0; i < num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    var loc = p5.createVector(
      p5.random(p5.width * 1.2),
      p5.random(p5.height),
      2
    );
    var angle = 0; //any value to initialize
    var dir = p5.createVector(p5.cos(angle), p5.sin(angle));
    var speed = p5.random(0.5, 2);
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
    particles[i] = new Particle(loc, dir, speed, p5);
  }
};

export const draw = (p5: p5Types) => {
  // background(0);
  p5.fill(30, 10);
  p5.noStroke();
  p5.rect(0, 0, p5.width, p5.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
};

interface IParticle {
  loc: p5Types.Vector;
  dir: p5Types.Vector;
  speed: number;
  p5: p5Types;
}

class Particle implements IParticle {
  loc: p5Types.Vector;
  dir: p5Types.Vector;
  speed: number;
  p5: p5Types;
  constructor(
    _loc: p5Types.Vector,
    _dir: p5Types.Vector,
    _speed: number,
    _p5: p5Types
  ) {
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.p5 = _p5;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move() {
    let angle =
      this.p5.noise(
        this.loc.x / noiseScale,
        this.loc.y / noiseScale,
        this.p5.frameCount / noiseScale
      ) *
      this.p5.TWO_PI *
      noiseStrength; //0-2PI
    this.dir.x = this.p5.cos(angle);
    this.dir.y = this.p5.sin(angle);
    var vel = this.dir.copy();
    var d = 1; //direction change
    vel.mult(this.speed * d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges() {
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (
      this.loc.x < 0 ||
      this.loc.x > this.p5.width ||
      this.loc.y < 0 ||
      this.loc.y > this.p5.height
    ) {
      this.loc.x = this.p5.random(this.p5.width * 1.2);
      this.loc.y = this.p5.random(this.p5.height);
    }
  }
  update(): void {
    this.p5.fill(255);
    this.p5.ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}

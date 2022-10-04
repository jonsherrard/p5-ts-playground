import React from 'react';
import './App.css';
import P5Types from 'p5';
import { ReactP5Wrapper, Sketch, SketchProps } from 'react-p5-wrapper';
import { useElementSize } from 'usehooks-ts';

export type SetupOptions = {
  height: number;
  width: number;
};

const SketchView = ({
  sketchModule,
  width,
  height,
}: {
  sketchModule: any;
  width: number;
  height: number;
}) => {
  const sketch: Sketch<SketchProps> = (p5: P5Types) => {
    p5.setup = () => sketchModule.setup(p5, { width, height });

    // @ts-expect-error This is a sketch wrappre function, not a p5 thing
    p5.updateWithProps = ({
      width,
      height,
    }: {
      width: number;
      height: number;
    }) => {
      console.log('updateWithProps', width, height);
      p5.resizeCanvas(width, height);
    };

    p5.draw = () => sketchModule.draw(p5);
  };
  return <ReactP5Wrapper sketch={sketch} width={width} height={height} />;
};

const App = ({ sketches }: { sketches: any[] }) => {
  console.log('Rendering App');
  const [sketchIndex, setSketchIndex] = React.useState(0);
  const sketchModule = sketches[sketchIndex];
  const [squareRef, { width, height }] = useElementSize();
  console.log({ width, height });
  return (
    <div className="App">
      <div className="Sidebar">
        {sketches.map((sketchModule: any, index: number) => {
          return (
            <div
              onClick={() => {
                setSketchIndex(index);
              }}
              key={index}
              className="SidebarItem"
              data-aria-selected={index === sketchIndex}
            >
              {sketchModule.title}
            </div>
          );
        })}
      </div>
      <div ref={squareRef} className="SketchView">
        <SketchView sketchModule={sketchModule} width={width} height={height} />
      </div>
    </div>
  );
};

export default App;

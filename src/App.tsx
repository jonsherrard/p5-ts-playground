import React, { useEffect, useRef } from 'react';
import './App.css';
import P5Types from 'p5';
import { ReactP5Wrapper, Sketch, SketchProps } from 'react-p5-wrapper';
import useSize from '@react-hook/size';

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
    // p5.updateWithProps = ({
    //   width,
    //   height,
    // }: {
    //   width: number;
    //   height: number;
    // }) => {
    //   console.log('updateWithProps', width, height);
    //   // p5.resizeCanvas(width, height);
    // };

    p5.draw = () => sketchModule.draw(p5);
  };
  return <ReactP5Wrapper sketch={sketch} width={width} height={height} />;
};

const App = ({ sketches }: { sketches: any[] }) => {
  console.log('Rendering App');
  const [sketchIndex, setSketchIndex] = React.useState(0);
  const sketchModule = sketches[sketchIndex];
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth - 220);
  // useEffect to update width and height on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 220);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // useEffect to update sketch on url hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const index = parseInt(hash.replace('#', ''));
      if (index >= 0 && index < sketches.length) {
        setSketchIndex(index);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sketches]);

  // useEffect to update sketch on initial hash
  useEffect(() => {
    const hash = window.location.hash;
    const index = parseInt(hash.replace('#', ''));
    if (index >= 0 && index < sketches.length) {
      setSketchIndex(index);
    }
  }, [sketches]);

  return (
    <div className="App">
      <div className="Sidebar">
        {sketches.map((sketchModule: any, index: number) => {
          return (
            <div
              onClick={() => {
                window.location.hash = index.toString();
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
      <div className="SketchView">
        <SketchView sketchModule={sketchModule} width={width} height={height} />
      </div>
    </div>
  );
};

export default App;

import './App.css';
// @ts-expect-error no type for this
import Sketch from './sketch-renderer';

const App = ({ sketches }: { sketches: any[] }) => {
  console.log('Rendering App');
  return (
    <div className="App">
      {sketches.map((sketch: any, index: number) => {
        return (
          <div key={index}>
            <h1>{sketch.title}!</h1>
            ---
            <Sketch
              key={index}
              setup={sketch.setup}
              draw={sketch.draw}
              width={800}
              height={500}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;

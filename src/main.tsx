import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const modules = import.meta.glob('./sketches/*.ts', { eager: true });

let sketchez: any[] = [];
for (const path in modules) {
  const mod = modules[path];
  // push mod to state array
  sketchez.push(mod);
}
// await all imports to load
Promise.all(Object.values(modules)).then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App sketches={sketchez} />
    </React.StrictMode>
  );
});

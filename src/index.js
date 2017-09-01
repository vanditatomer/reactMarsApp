import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

//setting a timer
function tick() {
  
  ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
}

setInterval(tick, 1000);
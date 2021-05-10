import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import './i18n/i18n';

//Boostrap 4
import 'bootstrap/dist/css/bootstrap.css';

import './i18n/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);


import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import {  } from '@syncfusion/ej2-base';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// registerLicense(
//   'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGNWfFppR2NbfU50flRDallZVAciSV9jS3xTf0dqWXtceHdVQmNdUg=='
// );

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

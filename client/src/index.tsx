import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShopProvider } from "./context/ShopContext";
import App from './App';
import './scss/index.scss';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <ShopProvider>

      <App />

    </ShopProvider>

  </React.StrictMode>
);


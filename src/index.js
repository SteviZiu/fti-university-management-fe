import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { Provider } from 'react-redux';
import { store } from './store'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter } from "react-router-dom"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <MsalProvider instance={msalInstance}>
      <BrowserRouter >
      <App />
      </BrowserRouter >
      </MsalProvider>
    </Provider>
  </React.StrictMode>
);



import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from "@chakra-ui/react";
import Theme from "./theme/Theme";

import { AlgoProvider } from "./hooks/AlgoProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <AlgoProvider>
          <App />
      </AlgoProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

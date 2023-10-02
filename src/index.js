import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3Modal } from '@web3modal/react';
import { ethereumClient, wagmiConfig } from './helper/wagmi';
import { PROJECT_ID } from './helper/constant';
import { WagmiConfig } from 'wagmi'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} themeVariables={{
      '--w3m-accent-color': '#5c4d28',
      '--w3m-background-color': '#5c4d28',
    }} />
  </React.StrictMode>
);

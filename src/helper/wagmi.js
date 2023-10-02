import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { PROJECT_ID } from './constant'

const chains = [goerli];


const { publicClient } = configureChains(chains, [w3mProvider({ projectId : PROJECT_ID })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId : PROJECT_ID, chains }),
  publicClient
})
export const ethereumClient = new EthereumClient(wagmiConfig, chains)
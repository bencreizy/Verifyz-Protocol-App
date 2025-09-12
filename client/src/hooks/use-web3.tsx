import { useState, useCallback } from 'react';

interface Web3State {
  isConnected: boolean;
  account: string | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWeb3() {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    account: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setState({
          isConnected: true,
          account: accounts[0],
          isConnecting: false,
          error: null,
        });
      } else {
        throw new Error('No accounts found');
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
      account: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  const calculateTokens = useCallback((usdAmount: number): number => {
    const vfyzPrice = 0.05; // $0.05 per VFYZ token
    return Math.floor(usdAmount / vfyzPrice);
  }, []);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    calculateTokens,
  };
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

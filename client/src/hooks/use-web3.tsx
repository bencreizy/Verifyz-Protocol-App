import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { User, InsertUser } from '@shared/schema';

interface PriceData {
  maticUsd: number;
  vfyzUsd: number;
  presaleActive: boolean;
  updated: string;
  source: string;
  error?: string;
}

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

  // Check if user exists for connected wallet
  const { data: user, isLoading: isUserLoading } = useQuery<User | null>({
    queryKey: ['/api/users/wallet', state.account],
    enabled: !!state.account && state.isConnected,
  });

  // Fetch live prices
  const { data: priceData, isLoading: isPriceLoading } = useQuery<PriceData>({
    queryKey: ['/api/presale/prices'],
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  // Create user mutation
  const createUserMutation = useMutation<User, Error, InsertUser>({
    mutationFn: async (userData: InsertUser) => {
      const res = await apiRequest('POST', '/api/users', userData);
      return (await res.json()) as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/wallet', state.account] });
    },
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
        setState(prev => ({
          ...prev,
          isConnected: true,
          account: accounts[0],
          isConnecting: false,
          error: null,
        }));
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
    const vfyzPrice = priceData?.vfyzUsd || 0.05; // Use live price or fallback
    return Math.floor(usdAmount / vfyzPrice);
  }, [priceData?.vfyzUsd]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    calculateTokens,
    user,
    isUserLoading,
    registerUser: createUserMutation.mutateAsync,
    isRegistering: createUserMutation.isPending,
    priceData,
    isPriceLoading,
  };
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

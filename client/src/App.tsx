import { useState, useEffect } from 'react';
import './index.css';
// Temporarily commented out until dependencies are installed
// import { useToast } from '@/hooks/use-toast';
// import { Toaster } from '@/components/ui/toaster';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { AlertCircle, Shield, Building2, Lock, TrendingUp, Zap, Dice6, Infinity, AlertTriangle, Twitter, MessageCircle, Send, Rocket } from 'lucide-react';

export default function App() {
  // const { toast } = useToast();
  const [maticPrice, setMaticPrice] = useState(0.257);
  const [usdAmount, setUsdAmount] = useState('100');
  const [isFirstTouch, setIsFirstTouch] = useState(true);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch live MATIC price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/presale/prices');
        const data = await response.json();
        if (data.maticUsd) {
          setMaticPrice(data.maticUsd);
        }
      } catch (error) {
        console.error('Error fetching MATIC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        // MetaMask is available (we're in MetaMask browser or desktop)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setConnectedWallet(accounts[0]);
          // toast({
          //   title: "Wallet connected!",
          //   description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          // });
        }
      } else if (isMobile) {
        // Mobile detected without MetaMask - redirect to MetaMask
        const metamaskUrl = `https://metamask.app.link/dapp/${window.location.host}`;
        window.open(metamaskUrl, '_blank');
      } else {
        // Desktop without MetaMask - show install message
        // toast({
        //   title: "MetaMask not found",
        //   description: "Please install MetaMask to connect your wallet",
        //   variant: "destructive",
        // });
        window.open('https://metamask.io/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // toast({
      //   title: "Connection failed",
      //   description: "Failed to connect to MetaMask. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsConnecting(false);
    }
  };

  const calculateTokens = () => {
    const usdValue = parseFloat(usdAmount) || 0;
    const tokens = usdValue / 0.05; // $0.05 per token
    return tokens;
  };

  const calculateMatic = () => {
    const usdValue = parseFloat(usdAmount) || 0;
    const maticAmount = usdValue / maticPrice;
    return maticAmount;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background circuit pattern */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: "url('/circuit-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="mb-4">
            <img 
              src="/verifyz-logo-main.png" 
              alt="VeriFyz Protocol" 
              className="h-16 mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            VeriFyz Protocol
          </h1>
          <p className="text-xl text-gray-300">Real proof in presence.</p>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎉 App Successfully Reassembled!
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">✅ Structure Fixed</h3>
                <ul className="text-left space-y-2">
                  <li>✅ Server/index.ts restored</li>
                  <li>✅ React app working</li>
                  <li>✅ Component conflicts resolved</li>
                  <li>✅ Path issues fixed</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">🚀 Ready for Enhancement</h3>
                <ul className="text-left space-y-2">
                  <li>🔄 Installing UI dependencies</li>
                  <li>⚡ Adding blockchain features</li>
                  <li>🎨 Restoring full styling</li>
                  <li>💰 Presale functionality</li>
                </ul>
              </div>
            </div>

            {/* Wallet Connection Preview */}
            <div className="bg-gray-900/50 p-8 rounded-lg border border-cyan-500/30 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Preview: Wallet Connection</h3>
              
              {connectedWallet ? (
                <div className="text-center">
                  <div className="text-green-400 text-lg mb-2">🟢 Wallet Connected</div>
                  <div className="font-mono text-sm bg-black/50 p-2 rounded">
                    {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
              
              {/* Price Calculator Preview */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-semibold mb-4">Token Calculator</h4>
                <div className="flex items-center gap-4 justify-center">
                  <input 
                    type="number" 
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="bg-black/50 border border-gray-600 rounded px-3 py-2 w-24 text-center"
                    placeholder="100"
                  />
                  <span className="text-gray-400">USD →</span>
                  <span className="font-mono text-cyan-400">
                    {calculateTokens().toLocaleString()} VFZ
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  ~{calculateMatic().toFixed(4)} MATIC (${maticPrice.toFixed(3)}/MATIC)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-400">
          <p>© 2025 VeriFyz Protocol - Anonymous Presence Verification</p>
        </footer>
      </div>

      {/* Toast container placeholder */}
      {/* <Toaster /> */}
    </div>
  );
}
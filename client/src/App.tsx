import './index.css';
import circuitBg from '@assets/file_000000001408622f958d2f57d7ac4ee1_1758071935262.png';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Shield, Building2, Lock, TrendingUp, Zap, Dice6, Infinity, AlertTriangle, Twitter, MessageCircle, Send, Rocket } from 'lucide-react';
import logoImg from '@assets/verifyz protocol _1758069285416.png';

export default function App() {
  const { toast } = useToast();
  const [maticPrice, setMaticPrice] = useState(0.257);
  const [usdAmount, setUsdAmount] = useState('100');
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
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setConnectedWallet(accounts[0]);
          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } else {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to participate in the presale",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const maticAmount = usdAmount ? (parseFloat(usdAmount) / maticPrice).toFixed(4) : '0';
  const vfyzTokens = usdAmount ? (parseFloat(usdAmount) / 0.05).toFixed(0) : '0';

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden">
      {/* Circuit background */}
      <div 
        className="fixed inset-0 opacity-40 animate-zigzag" 
        style={{
          backgroundImage: `url(${circuitBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 z-10">
          <div className="mb-8">
            <img 
              src={logoImg}
              alt="VeriFyz Protocol" 
              className="w-64 h-auto mx-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.2))' }}
            />
          </div>
          <p className="text-xl text-purple-400 font-light" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.2)' }}>
            Real proof in presence. 🟢
          </p>
          
          <div className="pt-8 space-y-4">
            {/* Whitepaper Button */}
            <div>
              <a 
                href="/whitepaper/verifyz-whitepaper.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 text-sm font-semibold bg-gray-900/80 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-purple-400/30"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Read Whitepaper
              </a>
            </div>
            
            <Button 
              className="px-12 py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
              onClick={() => document.getElementById('presale')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="mr-2" /> Join Presale
            </Button>
          </div>
        </div>
        
        {/* Glowing Arrow pointing to Presale */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => document.getElementById('presale')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to presale"
          >
            <svg 
              className="w-12 h-12" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 5v14m0 0l-7-7m7 7l7-7" 
                stroke="url(#arrow-gradient)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <defs>
                <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            <div className="text-cyan-400 text-xs mt-2 font-semibold" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
              PRESALE
            </div>
          </button>
        </div>
      </section>

      {/* Why VeriFyz Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(0, 255, 255, 0.2)' }}>
            Why VeriFyz<br />Changes<br />Everything
          </h2>
          
          <div className="relative w-full max-w-2xl mx-auto" style={{ paddingBottom: '177.78%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-cyan-500/30 card-glow-cyan"
              src="https://www.youtube.com/embed/oX_d-31JNF0"
              title="VeriFyz Commercial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Anonymous Verification */}
          <Card className="bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm p-8 hover:border-cyan-400 transition-colors card-glow-cyan">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Anonymous Verification</h3>
            <p className="text-gray-400">
              VeriFyz offers anonymous, yet verifiable presence without compromising user privacy.
            </p>
          </Card>

          {/* Big Tech Failed */}
          <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm p-8 hover:border-purple-400 transition-colors card-glow-purple">
            <div className="flex justify-center mb-6">
              <Building2 className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Big Tech Failed</h3>
            <p className="text-gray-400">
              Google, Meta, and Amazon have tried (and failed) to collect meaningful location data without privacy invasion.
            </p>
          </Card>

          {/* True Proof of Presence */}
          <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-8 hover:border-green-400 transition-colors card-glow-green">
            <div className="flex justify-center mb-6">
              <Lock className="w-16 h-16 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">True Proof of Presence</h3>
            <p className="text-gray-400">
              Users stay anonymous while businesses get powerful insights – solving the privacy paradox.
            </p>
          </Card>

          {/* Valuable Data */}
          <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm p-8 hover:border-purple-400 transition-colors card-glow-purple">
            <div className="flex justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Valuable Data</h3>
            <p className="text-gray-400">
              The first system that respects people and still delivers valuable real-world data.
            </p>
          </Card>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-center mb-20" style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)' }}>
            VeriFyz Protocol<br />Roadmap
          </h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
            
            {/* Q2 2025 - Left */}
            <div className="relative flex items-center mb-32">
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-6 card-glow-green">
                  <div className="text-green-400 text-2xl mb-2">✅ Q2</div>
                  <h3 className="text-green-400 font-bold text-xl mb-2">2025</h3>
                  <p className="text-gray-300">Project<br />concept<br />finalized</p>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-cyan-400 rounded-full"></div>
              </div>
              <div className="w-5/12 ml-auto"></div>
            </div>

            {/* Q3 2025 MVP - Right */}
            <div className="relative flex items-center mb-32">
              <div className="w-5/12"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-cyan-400 rounded-full"></div>
              </div>
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-6 ml-auto card-glow-green">
                  <div className="text-green-400 text-2xl mb-2">✅ Q3</div>
                  <h3 className="text-green-400 font-bold text-xl mb-2">2025</h3>
                  <p className="text-gray-300">MVP launched<br />for early<br />testers</p>
                </Card>
              </div>
            </div>

            {/* Q3 2025 Presale - Left */}
            <div className="relative flex items-center mb-32">
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-pink-500/30 backdrop-blur-sm p-6 card-glow-pink">
                  <div className="text-pink-400 text-2xl mb-2">🚀 Q3</div>
                  <h3 className="text-pink-400 font-bold text-xl mb-2">2025</h3>
                  <p className="text-gray-300">Token Presale<br />+ Social<br />Launch Begins</p>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-purple-400 rounded-full"></div>
              </div>
              <div className="w-5/12 ml-auto"></div>
            </div>

            {/* Business Onboarding - Right */}
            <div className="relative flex items-center mb-32">
              <div className="w-5/12"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-gray-400 rounded-full"></div>
              </div>
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-gray-500/30 backdrop-blur-sm p-6 ml-auto card-glow-cyan">
                  <p className="text-gray-300">Business<br />onboarding<br />portal opens</p>
                </Card>
              </div>
            </div>

            {/* Q1 2026 - Left */}
            <div className="relative flex items-center mb-32">
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-gray-500/30 backdrop-blur-sm p-6 card-glow-cyan">
                  <div className="text-gray-400 text-2xl mb-2">➡️ SOON Q1</div>
                  <h3 className="text-gray-400 font-bold text-xl mb-2">2026</h3>
                  <p className="text-gray-300">Mobile apps +<br />QR/NFC<br />integrations</p>
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-gray-400 rounded-full"></div>
              </div>
              <div className="w-5/12 ml-auto"></div>
            </div>

            {/* 2026+ - Right */}
            <div className="relative flex items-center">
              <div className="w-5/12"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gray-900 border-2 border-purple-400 rounded-full"></div>
              </div>
              <div className="w-5/12">
                <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm p-6 ml-auto card-glow-purple">
                  <div className="text-purple-400 text-2xl mb-2">🎯</div>
                  <h3 className="text-purple-400 font-bold text-xl mb-2">2026+</h3>
                  <p className="text-gray-300">SDK release +<br />Global<br />adoption drive.</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifetime Rewards Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-12 card-glow-green">
            <div className="text-center space-y-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl md:text-5xl font-bold text-green-400">
                Lifetime<br />Reward<br />Winners<br />Selected!
              </h2>
            </div>
          </Card>

          <div className="mt-12 space-y-6">
            {/* Automatic */}
            <Card className="bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm p-6 card-glow-cyan">
              <div className="flex items-start space-x-4">
                <Zap className="w-8 h-8 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-cyan-400 font-bold text-xl mb-2">Automatic</h3>
                  <p className="text-gray-400">No sign-up required. Just hold to qualify.</p>
                </div>
              </div>
            </Card>

            {/* Random Selection */}
            <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm p-6 card-glow-purple">
              <div className="flex items-start space-x-4">
                <Dice6 className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-purple-400 font-bold text-xl mb-2">Random Selection</h3>
                  <p className="text-gray-400">Completely random. Could be anyone.</p>
                </div>
              </div>
            </Card>

            {/* Lifetime Rewards */}
            <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-6">
              <div className="flex items-start space-x-4">
                <Infinity className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-green-400 font-bold text-xl mb-2">Lifetime Rewards</h3>
                  <p className="text-gray-400">From every buy, sell, and trade. Forever.</p>
                </div>
              </div>
            </Card>

            {/* Only 5 Wallets */}
            <Card className="bg-gray-900/80 border-yellow-500/30 backdrop-blur-sm p-6 card-glow-yellow">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-purple-400 font-bold text-xl mb-2">Only 5 wallets. Ever.</h3>
                  <p className="text-gray-400">
                    Once selected, these wallets earn rewards automatically from the entire VeriFyz ecosystem. 
                    <span className="text-green-400 font-bold"> No action required.</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl text-white mb-8" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)' }}>Get ready for the presale launch.</p>
            <Button className="px-12 py-6 text-xl font-bold bg-green-500 hover:bg-green-400 text-black rounded-lg shadow-lg hover:shadow-green-400/50 transition-all duration-300">
              🔔 Get Notified
            </Button>
          </div>
        </div>
      </section>

      {/* Live Connected Wallets */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm p-12 card-glow-cyan">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 font-bold text-xl">LIVE</span>
                </div>
                <h3 className="text-2xl text-cyan-400 font-bold">CONNECTED WALLETS</h3>
              </div>
              <div className="text-6xl font-bold text-cyan-400">0</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Token Presale Section */}
      <section id="presale" className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img 
              src={logoImg}
              alt="VeriFyz Protocol" 
              className="w-48 h-auto mx-auto mb-8"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.2))' }}
            />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)' }}>
              VeriFyz Token<br />Presale
            </h2>
            <p className="text-xl text-purple-400 mt-4 px-4 break-words" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)' }}>
              Get VeriFyz tokens at $0.05 each during our exclusive presale
            </p>
          </div>

          {/* Connect Wallet */}
          <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-8 mb-8 card-glow-green">
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl mb-4">🔗</div>
              <div className="w-full">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-6">
                  Connect your MetaMask wallet to participate in the presale
                </p>
                
                {!connectedWallet && (
                  <div className="space-y-4">
                    <Card className="bg-purple-900/30 border-purple-500/30 p-4 card-glow-purple">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-purple-400 mt-1" />
                        <div>
                          <p className="text-purple-400 font-bold">Mobile detected - Open this site in MetaMask browser</p>
                          <ol className="text-gray-400 text-sm mt-2 space-y-1">
                            <li>1. Open MetaMask app</li>
                            <li>2. Tap the menu (☰)</li>
                            <li>3. Select "Browser"</li>
                            <li>4. Visit this website again</li>
                          </ol>
                        </div>
                      </div>
                    </Card>
                    
                    <Button 
                      className="w-full py-6 text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black rounded-lg"
                      onClick={connectWallet}
                      disabled={isConnecting}
                    >
                      {isConnecting ? 'Connecting...' : 'Open in MetaMask'}
                    </Button>
                  </div>
                )}
                
                {connectedWallet && (
                  <div className="text-green-400">
                    ✓ Connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Calculator */}
          <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm p-8 mb-8 card-glow-purple overflow-hidden">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">
              💵 USD → VeriFyz Calculator
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-cyan-400 block mb-2">USD Amount</label>
                <Input
                  type="number"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  className="w-full bg-black/50 border-purple-500/30 text-white text-xl py-3"
                  placeholder="100"
                />
              </div>
              
              <div className="bg-black/50 border border-gray-700 rounded-lg p-4 space-y-2 overflow-hidden">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-400 whitespace-nowrap">MATIC Amount:</span>
                  <span className="text-cyan-400 font-bold text-xl break-all text-right">{maticAmount} MATIC</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-400 whitespace-nowrap">Current MATIC/USD:</span>
                  <span className="text-green-400 font-bold text-right">${maticPrice.toFixed(3)}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-400 whitespace-nowrap">Token Price:</span>
                  <span className="text-purple-400 font-bold text-right">$0.05</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between items-start gap-2">
                  <span className="text-white font-bold whitespace-nowrap">You'll receive:</span>
                  <span className="text-green-400 font-bold text-xl break-all text-right">{vfyzTokens} VeriFyz tokens</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Complete Purchase */}
          <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm p-8 mb-8 card-glow-green">
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl mb-4">🛍️</div>
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-6 break-words">Complete Your Purchase</h3>
                
                <div className="bg-black/50 border border-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-gray-400 mb-2">Recipient Address:</p>
                  <p className="text-cyan-400 font-mono text-sm break-all">
                    0xDde2aD00BCdc1566c671a31b50a433796d50Eedf
                  </p>
                </div>
                
                <Button 
                  className="w-full py-6 text-xl font-bold bg-green-500 hover:bg-green-400 text-black rounded-lg shadow-lg hover:shadow-green-400/50 transition-all duration-300"
                  disabled={!connectedWallet}
                >
                  Send ${usdAmount} USD ({maticAmount} MATIC)
                </Button>
                
                <Card className="bg-yellow-900/20 border-yellow-500/30 mt-6 p-4 card-glow-yellow">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="text-yellow-400 font-bold">Safety Note:</p>
                      <p className="text-gray-400 text-sm break-words">
                        Tokens will be distributed after the presale concludes. Please verify the wallet address before sending MATIC. This transaction is irreversible.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Stay Tuned */}
          <Card className="bg-gray-900/80 border-pink-500/30 backdrop-blur-sm p-8 card-glow-pink">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="text-3xl font-bold text-green-400 mb-4 break-words">
                  Stay Tuned for<br />Presale Start and<br />Results
                </h3>
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <p className="text-xl font-bold">Presale Coming Soon</p>
                    <p>Presale will begin shortly. Stay tuned!</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-cyan-500/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 VeriFyz Protocol. The future of anonymous presence verification.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
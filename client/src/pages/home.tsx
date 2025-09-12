
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWeb3 } from '@/hooks/use-web3';
import { UserRegistrationDialog } from '@/components/user-registration-dialog';
import { 
  Shield, 
  Building2,
  Lock,
  BarChart3,
  Play,
  CheckCircle,
  Dice1,
  Infinity,
  AlertTriangle,
  Rocket,
  Wallet,
  Coins,
  Bell,
  ExternalLink
} from 'lucide-react';

// Advanced Circuit Board Background Component
function CircuitBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Circuit SVG */}
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradients for different circuit colors */}
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00cccc" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#008888" stopOpacity="0.3"/>
          </linearGradient>
          
          <linearGradient id="magentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#cc00cc" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#880088" stopOpacity="0.3"/>
          </linearGradient>
          
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff00" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00cc00" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#008800" stopOpacity="0.3"/>
          </linearGradient>
          
          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffff00" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#cccc00" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#888800" stopOpacity="0.3"/>
          </linearGradient>

          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Vertical Circuit Paths */}
        <g className="animate-pulse-slow" style={{animationDelay: '0s'}}>
          <path d="M50 0 L50 150 L120 150 L120 300 L80 300 L80 450" 
                stroke="url(#cyanGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
          <path d="M350 0 L350 100 L280 100 L280 250 L320 250 L320 400" 
                stroke="url(#magentaGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
        </g>
        
        <g className="animate-pulse-slow" style={{animationDelay: '1s'}}>
          <path d="M150 50 L150 200 L220 200 L220 350 L180 350 L180 500" 
                stroke="url(#greenGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
          <path d="M250 0 L250 180 L180 180 L180 330 L220 330 L220 480" 
                stroke="url(#yellowGrad)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
        </g>
        
        {/* Horizontal connections */}
        <g className="animate-pulse-slow" style={{animationDelay: '2s'}}>
          <path d="M0 200 L100 200 L100 250 L200 250" 
                stroke="url(#cyanGrad)" strokeWidth="1" fill="none" filter="url(#glow)"/>
          <path d="M400 300 L300 300 L300 350 L200 350" 
                stroke="url(#magentaGrad)" strokeWidth="1" fill="none" filter="url(#glow)"/>
        </g>
        
        {/* Connection Nodes */}
        <g>
          <circle cx="50" cy="150" r="3" fill="#00ffff" filter="url(#glow)" className="animate-pulse"/>
          <circle cx="120" cy="300" r="2" fill="#00cccc" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="350" cy="100" r="3" fill="#ff00ff" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="280" cy="250" r="2" fill="#cc00cc" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
          <circle cx="150" cy="200" r="2" fill="#00ff00" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '2s'}}/>
          <circle cx="220" cy="350" r="3" fill="#00cc00" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '2.5s'}}/>
          <circle cx="250" cy="180" r="2" fill="#ffff00" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '3s'}}/>
        </g>
      </svg>
      
      {/* Moving light effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" 
             style={{top: '20%', left: '10%', animationDuration: '3s'}}></div>
        <div className="absolute w-32 h-32 bg-magenta-500/10 rounded-full blur-xl animate-pulse" 
             style={{top: '40%', right: '10%', animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse" 
             style={{bottom: '30%', left: '15%', animationDuration: '5s', animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}

// New Cyberpunk Fingerprint Icon Component
function FingerprintIcon({ size = 120 }: { size?: number }) {
  return (
    <div className={`relative animate-pulse-slow mx-auto`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <defs>
          {/* Cyberpunk gradient matching the image */}
          <linearGradient id="cyberpunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="1"/>
            <stop offset="25%" stopColor="#7C3AED" stopOpacity="1"/>
            <stop offset="50%" stopColor="#EC4899" stopOpacity="1"/>
            <stop offset="75%" stopColor="#06B6D4" stopOpacity="1"/>
            <stop offset="100%" stopColor="#F97316" stopOpacity="1"/>
          </linearGradient>
          
          {/* Circuit board gradient */}
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="1"/>
            <stop offset="50%" stopColor="#F97316" stopOpacity="1"/>
            <stop offset="100%" stopColor="#EC4899" stopOpacity="1"/>
          </linearGradient>
          
          <filter id="cyberpunkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main fingerprint ridges - curved arcs */}
        <g stroke="url(#cyberpunkGrad)" strokeWidth="3" fill="none" filter="url(#cyberpunkGlow)" className="animate-pulse-slow">
          {/* Outer ridges */}
          <path d="M 60 40 Q 40 60 60 120 Q 100 140 140 120 Q 160 100 150 80 Q 140 60 120 50" strokeWidth="2.5"/>
          <path d="M 70 50 Q 50 70 70 120 Q 100 135 130 120 Q 150 100 140 80 Q 130 65 115 60" strokeWidth="2.5"/>
          <path d="M 80 60 Q 60 80 80 115 Q 100 130 120 115 Q 140 100 130 85 Q 120 75 110 70" strokeWidth="2.5"/>
          <path d="M 90 70 Q 70 90 90 110 Q 100 120 110 110 Q 130 95 120 90 Q 110 85 105 80" strokeWidth="2.5"/>
          <path d="M 100 80 Q 80 95 100 105 Q 105 110 110 105 Q 120 100 115 95" strokeWidth="2.5"/>
          
          {/* Inner core ridges */}
          <path d="M 105 85 Q 95 95 105 100 Q 108 102 110 100" strokeWidth="2"/>
          <path d="M 108 88 Q 102 92 108 96" strokeWidth="1.5"/>
        </g>
        
        {/* Circuit board elements on the right side */}
        <g stroke="url(#circuitGrad)" strokeWidth="2.5" fill="none" filter="url(#cyberpunkGlow)">
          {/* Main circuit stem */}
          <path d="M 140 100 L 180 100 L 180 80 L 200 80" strokeWidth="3"/>
          <path d="M 180 100 L 200 120" strokeWidth="2"/>
          <path d="M 180 100 L 200 140" strokeWidth="2"/>
          
          {/* Circuit nodes/connections */}
          <circle cx="180" cy="80" r="6" fill="#06B6D4" stroke="#06B6D4" strokeWidth="2"/>
          <circle cx="180" cy="120" r="5" fill="#F97316" stroke="#F97316" strokeWidth="2"/>
          <circle cx="200" cy="140" r="4" fill="#EC4899" stroke="#EC4899" strokeWidth="2"/>
          
          {/* Additional circuit lines */}
          <path d="M 200 80 L 220 80 L 220 70" strokeWidth="2"/>
          <path d="M 200 120 L 215 120" strokeWidth="1.5"/>
          <path d="M 200 140 L 210 140 L 210 150" strokeWidth="1.5"/>
        </g>
        
        {/* Animated pulse dots */}
        <g>
          <circle cx="180" cy="80" r="2" fill="#06B6D4" className="animate-pulse" style={{animationDelay: '0s'}}/>
          <circle cx="180" cy="120" r="2" fill="#F97316" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="200" cy="140" r="2" fill="#EC4899" className="animate-pulse" style={{animationDelay: '1s'}}/>
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [showRegistration, setShowRegistration] = useState(false);
  
  const { 
    isConnected, 
    account, 
    isConnecting, 
    error, 
    connectWallet, 
    calculateTokens,
    user,
    isUserLoading,
    registerUser,
    isRegistering,
    priceData,
    isPriceLoading
  } = useWeb3();
  
  const tokens = usdAmount ? calculateTokens(parseFloat(usdAmount) || 0) : 0;
  const maticPrice = priceData?.maticUsd || 0.271;
  const vfyzPrice = priceData?.vfyzUsd || 0.05;

  // Handle wallet connection and user registration flow
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  // Show registration dialog when wallet is connected but user doesn't exist
  useEffect(() => {
    if (isConnected && account && !isUserLoading && !user) {
      setShowRegistration(true);
    }
  }, [isConnected, account, isUserLoading, user]);

  // Feature cards data
  const features = [
    {
      icon: Shield,
      title: "Anonymous Verification",
      description: "VeriFyz offers anonymous, yet verifiable presence without compromising user privacy.",
      color: "cyan"
    },
    {
      icon: Building2, 
      title: "Big Tech Failed",
      description: "Google, Meta, and Amazon have tried (and failed) to collect meaningful location data without privacy invasion.",
      color: "magenta"
    },
    {
      icon: Lock,
      title: "True Proof of Presence", 
      description: "Users stay anonymous while businesses get powerful insights – solving the privacy paradox.",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Valuable Data",
      description: "The first system that respects people and still delivers valuable real-world data.",
      color: "purple"
    }
  ];

  // Roadmap timeline data
  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Project concept finalized",
      status: "completed"
    },
    {
      quarter: "Q3 2025",
      title: "MVP launched for early testers",
      status: "completed"
    },
    {
      quarter: "Q3 2025", 
      title: "Token Presale + Social Launch Begins",
      status: "in-progress"
    },
    {
      quarter: "Q1 2026",
      title: "Mobile apps + QR/NFC integrations",
      status: "upcoming"
    },
    {
      quarter: "2026+",
      title: "SDK release + Global adoption drive", 
      status: "future"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden max-w-md mx-auto">
      {/* Circuit Board Background */}
      <CircuitBackground />
      
      <div className="relative z-10 px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-8 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              VeriFyz Protocol
            </h1>
            <p className="text-gray-400 mb-8">
              Real proof in presence.
            </p>
          </div>

          <div className="mb-12">
            <FingerprintIcon size={160} />
          </div>

          <Button className="w-full max-w-xs bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/25">
            <Rocket className="h-5 w-5 mr-2" />
            Join Presale
          </Button>
        </section>

        {/* Video Section */}
        <section className="py-8">
          <Card className="bg-gray-900/80 border border-cyan-400/30 rounded-lg overflow-hidden shadow-lg shadow-cyan-500/10">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                  <p className="text-cyan-400 text-sm">Why VeriFyz Changes Everything</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feature Cards */}
        <section className="py-8 space-y-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = {
              cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-400/40', icon: 'text-cyan-400' },
              magenta: { bg: 'bg-pink-500/20', border: 'border-pink-400/40', icon: 'text-pink-400' },
              green: { bg: 'bg-green-500/20', border: 'border-green-400/40', icon: 'text-green-400' },
              purple: { bg: 'bg-purple-500/20', border: 'border-purple-400/40', icon: 'text-purple-400' }
            };
            const colorScheme = colors[feature.color as keyof typeof colors];
            
            return (
              <Card key={index} className={`bg-gray-900/80 border ${colorScheme.border} rounded-lg shadow-lg`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${colorScheme.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Roadmap Timeline */}
        <section className="py-8 space-y-4">
          {roadmapItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-900/80 border border-cyan-400/30 flex flex-col items-center justify-center">
                {item.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-400 mb-1" />}
                {item.status === 'in-progress' && <Rocket className="h-5 w-5 text-yellow-400 mb-1" />}
                {item.status === 'upcoming' && <div className="w-3 h-3 rounded-full bg-gray-500 mb-1" />}
                {item.status === 'future' && <div className="w-3 h-3 rounded-full bg-gray-600 mb-1" />}
                <div className="text-xs text-center text-cyan-400 font-semibold">
                  {item.quarter}
                </div>
              </div>
              <Card className="flex-1 bg-gray-900/80 border border-gray-700/50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <div className="text-xs text-gray-400">
                    {item.status === 'completed' && '✓ Complete'}
                    {item.status === 'in-progress' && '🚀 In Progress'}
                    {item.status === 'upcoming' && '⏳ Coming Soon'}
                    {item.status === 'future' && '🔮 Future'}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        {/* Lifetime Rewards Section */}
        <section className="py-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border border-green-400/40 rounded-lg shadow-lg shadow-green-500/10">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 text-green-400">
                  🎉 Lifetime Reward Winners Selected!
                </h2>
                <p className="text-gray-300 text-sm">Automatic. Random. Lifetime. Forever.</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <Card className="bg-gray-900/60 border border-purple-400/30">
                  <CardContent className="p-4 text-center">
                    <Rocket className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-purple-400">Automatic</h3>
                    <p className="text-xs text-gray-400">No sign-up required. Just hold to qualify.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/60 border border-cyan-400/30">
                  <CardContent className="p-4 text-center">
                    <Dice1 className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-cyan-400">Random Selection</h3>
                    <p className="text-xs text-gray-400">Completely random. Could be anyone.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/60 border border-green-400/30">
                  <CardContent className="p-4 text-center">
                    <Infinity className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-bold mb-1 text-green-400">Lifetime Rewards</h3>
                    <p className="text-xs text-gray-400">From every buy, sell, and trade. Forever.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-red-900/30 border border-red-400/40 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-400 mb-1">⚠️ Only 5 wallets. Ever.</h4>
                      <p className="text-xs text-gray-400">
                        Once selected, these wallets earn rewards automatically from the entire VeriFyz ecosystem.
                        <span className="text-green-400"> No action required.</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-gray-300 mb-4">Get ready for the presale launch.</p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-cyan-500 hover:to-green-500 text-black font-bold py-3 px-6 rounded-lg">
                  <Bell className="h-5 w-5 mr-2" />
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Wallet Connection Section */}
        <section className="py-8">
          <Card className="bg-gray-900/80 border border-cyan-400/30 rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                🔗 CONNECT YOUR WALLETS
                <ExternalLink className="h-4 w-4" />
              </h3>
              <div className="text-center">
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white font-bold py-4 px-6 rounded-lg mb-4" 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  {isConnecting ? 'Connecting...' : 
                   isConnected && user ? `${user.username}` :
                   isConnected ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}` : 
                   'Connect Your Wallet'}
                </Button>
                
                {!isConnected && (
                  <Card className="bg-purple-900/30 border border-purple-400/40">
                    <CardContent className="p-4">
                      <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                        🔮 Mobile optimized - Open this link in MetaMask browser
                      </h4>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>1. Open MetaMask App</p>
                        <p>2. Tap the menu (☰)</p>
                        <p>3. Select "Browser"</p>
                        <p>4. Visit this website again</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {!isConnected && (
                  <Button className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold py-3 rounded-lg">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in MetaMask
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* VeriFyz Token Presale Section */}
        <section className="py-8">
          <div className="text-center mb-6">
            <FingerprintIcon size={100} />
            <h2 className="text-2xl font-bold mt-4 mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              VeriFyz Token Presale
            </h2>
            <p className="text-gray-400 text-sm">
              Get VeriFyz tokens at $0.05 each during our exclusive presale
            </p>
          </div>

          {/* USD Calculator */}
          <Card className="bg-gray-900/80 border border-purple-400/40 mb-6 shadow-lg shadow-purple-500/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                🧮 USD → VeriFyz Calculator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">USD Amount</label>
                  <Input
                    type="number"
                    placeholder="100"
                    className="bg-gray-800 border-purple-400/30 text-white rounded-lg py-3"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">MATIC Amount:</span>
                    <div className="font-bold text-cyan-400">
                      {usdAmount && parseFloat(usdAmount) > 0 
                        ? (parseFloat(usdAmount) / maticPrice).toFixed(4) + ' MATIC'
                        : '0 MATIC'
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Current MATIC/USD:</span>
                    <div className="font-bold text-cyan-400">
                      ${maticPrice.toFixed(3)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Token Price:</span>
                    <div className="font-bold text-purple-400">${vfyzPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">You'll receive:</span>
                    <div className="font-bold text-green-400">{tokens.toLocaleString()} VeriFyz tokens</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complete Purchase */}
          <Card className="bg-gray-900/80 border border-green-400/40 mb-6 shadow-lg shadow-green-500/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                🛒 Complete Your Purchase
              </h3>
              
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <div className="text-gray-400 text-sm mb-1">Recipient Address:</div>
                <div className="text-green-400 text-xs break-all font-mono">0x3b67a0b05cf15e6cf1ba13b59f3b7a41</div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold py-4 px-6 rounded-lg mb-4"
                disabled={!isConnected || !usdAmount || parseFloat(usdAmount) <= 0}
              >
                {usdAmount && parseFloat(usdAmount) > 0 
                  ? `🚀 Send $${parseFloat(usdAmount).toFixed(0)} USD (${(parseFloat(usdAmount) / maticPrice).toFixed(4)} MATIC)`
                  : '🚀 Send $0 USD (0 MATIC)'
                }
              </Button>

              <Card className="bg-red-900/20 border border-red-400/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-400">
                      <strong className="text-red-400">⚠️ Safety Note:</strong> Tokens will be distributed after the presale concludes. 
                      Please verify the wallet address before sending MATIC. This transaction is irreversible.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Presale Status */}
          <Card className="bg-gray-900/80 border border-yellow-400/40 shadow-lg shadow-yellow-500/10">
            <CardContent className="p-6 text-center">
              <Rocket className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                🚀 Stay Tuned for Presale Start and Results
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 font-bold">🚀 Presale Coming Soon</span>
              </div>
              <p className="text-gray-400 text-sm">Presale will begin shortly. Stay tuned!</p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-4">© 2025 VeriFyz Protocol. The future of anonymous presence verification.</p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-400/20 border border-purple-400/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
              </svg>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
          </div>
        </footer>

        {/* Registration Dialog */}
        <UserRegistrationDialog
          open={showRegistration}
          onOpenChange={setShowRegistration}
          walletAddress={account || ""}
          onRegister={registerUser}
          isRegistering={isRegistering}
        />
      </div>
    </div>
  );
}

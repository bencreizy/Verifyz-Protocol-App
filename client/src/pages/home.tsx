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
  Bell
} from 'lucide-react';

// Circuit Board Background Component
function CircuitBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 matrix-grid">
      <svg className="w-full h-full opacity-20" viewBox="0 0 800 600">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <path d="M20 20 L80 20 M80 20 L80 50 M80 50 L50 50 M50 50 L50 80" 
                  stroke="currentColor" strokeWidth="1" fill="none" className="text-primary/30"/>
            <path d="M10 60 L90 60 M30 40 L70 40" 
                  stroke="currentColor" strokeWidth="1" fill="none" className="text-accent/20"/>
            {/* Vertical lines */}  
            <path d="M40 10 L40 90 M60 15 L60 85" 
                  stroke="currentColor" strokeWidth="1" fill="none" className="text-primary/20"/>
            {/* Connection points */}
            <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary/60"/>
            <circle cx="80" cy="50" r="2" fill="currentColor" className="text-accent/60"/>
            <circle cx="50" cy="80" r="2" fill="currentColor" className="text-primary/40"/>
            <circle cx="60" cy="40" r="1.5" fill="currentColor" className="text-accent/50"/>
          </pattern>
          <radialGradient id="circuitGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,255,0,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)"/>
        <rect width="100%" height="100%" fill="url(#circuitGlow)"/>
      </svg>
    </div>
  );
}

// Fingerprint Icon Component  
function FingerprintIcon({ size = 160 }: { size?: number }) {
  return (
    <div className={`relative animate-pulse-slow`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <radialGradient id="fingerprintGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.9"/>
            <stop offset="30%" stopColor="currentColor" className="text-accent" stopOpacity="0.7"/>
            <stop offset="60%" stopColor="currentColor" className="text-primary" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="currentColor" className="text-accent" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        <g stroke="url(#fingerprintGrad)" strokeWidth="2" fill="none">
          {/* Inner rings */}
          <ellipse cx="80" cy="80" rx="12" ry="16"/>
          <ellipse cx="80" cy="80" rx="20" ry="26"/>
          <ellipse cx="80" cy="80" rx="28" ry="36"/>
          <ellipse cx="80" cy="80" rx="36" ry="46"/>
          <ellipse cx="80" cy="80" rx="44" ry="56"/>
          <ellipse cx="80" cy="80" rx="52" ry="66"/>
          {/* Fingerprint ridges */}
          <path d="M30 80 Q40 60 60 65 T100 70 Q120 75 125 85"/>
          <path d="M25 90 Q35 70 55 75 T95 80 Q115 85 120 95"/>
          <path d="M35 100 Q45 80 65 85 T105 90 Q125 95 130 105"/>
          <path d="M40 110 Q50 90 70 95 T110 100 Q130 105 135 115"/>
          {/* Circuit connections */}
          <path d="M80 20 L80 40 M60 80 L40 80 M100 80 L120 80 M80 120 L80 140" 
                strokeWidth="1" className="text-primary/40"/>
        </g>
        <circle cx="80" cy="80" r="4" fill="currentColor" className="text-primary animate-pulse"/>
        {/* Corner circuit elements */}
        <g className="text-accent/60" fill="currentColor">
          <circle cx="20" cy="20" r="2"/>
          <circle cx="140" cy="20" r="2"/>
          <circle cx="20" cy="140" r="2"/>
          <circle cx="140" cy="140" r="2"/>
        </g>
      </svg>
    </div>
  );
}

// Social Media Icons
function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <a href="#" className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
      <a href="#" className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center hover:bg-accent/30 transition-colors">
        <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
        </svg>
      </a>
      <a href="#" className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </a>
    </div>
  );
}

export default function Home() {
  const [usdAmount, setUsdAmount] = useState<string>('');
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
  const maticPrice = priceData?.maticUsd || 0.271984;
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

  // Feature cards data - Using static color mapping for Tailwind compatibility
  const features = [
    {
      icon: Shield,
      title: "Anonymous Verification",
      description: "VeriFyz offers anonymous, yet verifiable presence without compromising user privacy.",
      color: "primary",
      bgClass: "bg-primary/20",
      borderClass: "border-primary/40",
      iconClass: "text-primary"
    },
    {
      icon: Building2, 
      title: "Big Tech Failed",
      description: "Google, Meta, and Amazon have tried (and failed) to collect meaningful location data without privacy invasion.",
      color: "accent",
      bgClass: "bg-accent/20",
      borderClass: "border-accent/40",
      iconClass: "text-accent"
    },
    {
      icon: Lock,
      title: "True Proof of Presence", 
      description: "Users stay anonymous while businesses get powerful insights – solving the privacy paradox.",
      color: "primary",
      bgClass: "bg-primary/20",
      borderClass: "border-primary/40",
      iconClass: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Valuable Data",
      description: "The first system that respects people and still delivers valuable real-world data.",
      color: "accent",
      bgClass: "bg-accent/20",
      borderClass: "border-accent/40",
      iconClass: "text-accent"
    }
  ];

  // Roadmap timeline data
  const roadmapItems = [
    {
      quarter: "Q2",
      year: "2025",
      title: "Project concept finalized",
      status: "completed"
    },
    {
      quarter: "Q3", 
      year: "2025",
      title: "MVP launched for early testers",
      status: "completed"
    },
    {
      quarter: "Q3",
      year: "2025", 
      title: "Token Presale + Social Launch Begins",
      status: "in-progress"
    },
    {
      quarter: "Q1",
      year: "2026",
      title: "Mobile apps + QR/NFC integrations",
      status: "upcoming"
    },
    {
      quarter: "2026+",
      year: "",
      title: "SDK release + Global adoption drive", 
      status: "future"
    }
  ];

  // Lifetime reward options - Using static color mapping for Tailwind compatibility
  const rewardOptions = [
    {
      icon: Rocket,
      title: "Automatic",
      description: "No sign-up required. Just hold to qualify.",
      color: "cyan",
      iconClass: "text-cyan-400"
    },
    {
      icon: Dice1,
      title: "Random Selection", 
      description: "Completely random. Could be anyone.",
      color: "accent",
      iconClass: "text-accent"
    },
    {
      icon: Infinity,
      title: "Lifetime Rewards",
      description: "From every buy, sell, and trade. Forever.",
      color: "primary",
      iconClass: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Circuit Board Background */}
      <CircuitBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8">
          {/* I need the VeriFyz Protocol logo here - this is a branded asset */}
          <div className="text-center mb-8">
            <h1 className="cyber-text text-4xl md:text-6xl font-bold text-glow mb-4" data-testid="text-hero-title">
              VeriFyz Protocol
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              Real proof in presence.
            </p>
          </div>

          {/* Fingerprint Icon */}
          <div className="mb-12">
            <FingerprintIcon size={200} />
          </div>

          {/* Join Presale Button */}
          <Button 
            className="cyber-button px-12 py-4 text-lg font-bold rounded-xl border-2 glow-hover"
            data-testid="button-join-presale"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Join Presale
          </Button>
        </section>

        {/* Video Section Placeholder */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/30 p-8 glow-border">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Video player would go here</p>
                  <p className="text-sm text-muted-foreground/60">I need the actual video file from you</p>
                </div>
              </div>
              <h3 className="cyber-text text-xl font-bold text-primary mb-2">Why VeriFyz Changes Everything</h3>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-card/20 backdrop-blur-sm border-primary/30 glow-border glow-hover" data-testid={`card-feature-${index}`}>
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-lg ${feature.bgClass} border ${feature.borderClass} flex items-center justify-center mb-6`}>
                        <IconComponent className={`h-8 w-8 ${feature.iconClass}`} />
                      </div>
                      <h3 className="cyber-text text-xl font-bold mb-4" data-testid={`text-feature-${index}-title`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-feature-${index}-description`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Roadmap Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-6" data-testid={`roadmap-item-${index}`}>
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-card/30 border border-primary/30 flex flex-col items-center justify-center glow-border">
                    {item.status === 'completed' && <CheckCircle className="h-6 w-6 text-primary mb-1" />}
                    {item.status === 'in-progress' && <Rocket className="h-6 w-6 text-accent mb-1" />}
                    <div className="text-xs text-center">
                      <div className="font-bold text-primary">{item.quarter}</div>
                      <div className="text-muted-foreground">{item.year}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="bg-card/20 backdrop-blur-sm border-primary/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2" data-testid={`text-roadmap-${index}-title`}>{item.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          {item.status === 'completed' && '✓ Complete'}
                          {item.status === 'in-progress' && '🚀 In Progress'}
                          {item.status === 'upcoming' && '⏳ Coming Soon'}
                          {item.status === 'future' && '🔮 Future'}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifetime Rewards Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 glow-border">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="cyber-text text-3xl font-bold text-glow mb-4" data-testid="text-lifetime-rewards-title">
                    🎉 Lifetime Reward Winners Selected!
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {rewardOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <Card key={index} className="bg-card/30 backdrop-blur-sm border-primary/20" data-testid={`card-reward-${index}`}>
                        <CardContent className="p-6 text-center">
                          <IconComponent className={`h-12 w-12 ${option.iconClass} mx-auto mb-4`} />
                          <h3 className="font-bold mb-2" data-testid={`text-reward-${index}-title`}>{option.title}</h3>
                          <p className="text-sm text-muted-foreground" data-testid={`text-reward-${index}-description`}>
                            {option.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Card className="bg-card/30 border border-destructive/30 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-destructive mb-2">⚠️ Only 5 wallets. Ever.</h4>
                        <p className="text-sm text-muted-foreground">
                          Once selected, these wallets earn rewards automatically from the entire VeriFyz ecosystem. 
                          <span className="text-primary"> No action required.</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center mb-8">
                  <p className="text-lg mb-6">Get ready for the presale launch.</p>
                  <Button className="cyber-button px-8 py-3 text-lg font-bold" data-testid="button-get-notified">
                    <Bell className="h-5 w-5 mr-2" />
                    Get Notified
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Presale Calculator */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <FingerprintIcon size={120} />
              <h2 className="cyber-text text-3xl font-bold text-glow mt-6 mb-4" data-testid="text-presale-title">
                VeriFyz Token Presale  
              </h2>
              <p className="text-muted-foreground mb-8" data-testid="text-presale-subtitle">
                Get VeriFyz tokens at $0.05 each during our exclusive presale
              </p>
            </div>

            <Card className="bg-card/20 backdrop-blur-sm border-primary/30 glow-border" data-testid="card-presale">
              <CardContent className="p-8">
                {/* Wallet Connection */}
                <div className="text-center mb-8">
                  <Button 
                    className="cyber-button w-full py-4 text-lg font-bold" 
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    data-testid="button-connect-wallet"
                  >
                    <Wallet className="h-5 w-5 mr-2" />
                    {isConnecting ? 'Connecting...' : 
                     isConnected && user ? `${user.username} (${account?.slice(0, 6)}...${account?.slice(-4)})` :
                     isConnected ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}` : 
                     '🔗 Connect Your Wallet'}
                  </Button>
                  {error && (
                    <p className="text-destructive text-sm mt-2" data-testid="text-wallet-error">{error}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">Connect your MetaMask wallet to participate in the presale</p>
                </div>

                {/* USD Calculator */}
                <Card className="bg-card/30 border-accent/30 mb-6" data-testid="card-calculator">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Coins className="h-6 w-6 text-accent" />
                      <h3 className="cyber-text text-xl font-bold text-accent">💸 USD → VeriFyz Calculator</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">USD Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder="100"
                            className="pl-8 bg-background/50 border-accent/30 text-white"
                            value={usdAmount}
                            onChange={(e) => setUsdAmount(e.target.value)}
                            data-testid="input-usd-amount"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">MATIC Amount:</span>
                          <div className="font-bold text-primary">
                            {usdAmount && parseFloat(usdAmount) > 0 
                              ? (parseFloat(usdAmount) / maticPrice).toFixed(4) + ' MATIC'
                              : '0 MATIC'
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current MATIC/USD:</span>
                          <div className="font-bold text-primary flex items-center gap-2">
                            ${maticPrice.toFixed(6)}
                            {isPriceLoading && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                            {priceData?.source === 'coingecko' && <span className="text-xs text-primary">●LIVE</span>}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Token Price:</span>
                          <div className="font-bold text-accent">${vfyzPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">You'll receive:</span>
                          <div className="font-bold text-primary">{tokens.toLocaleString()} VeriFyz tokens</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete Purchase */}
                <Card className="bg-primary/10 border-primary/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Rocket className="h-6 w-6 text-primary" />
                      <h3 className="cyber-text text-xl font-bold text-primary">🚀 Complete Your Purchase</h3>
                    </div>
                    
                    <div className="bg-card/50 rounded-lg p-4 mb-4 font-mono text-sm">
                      <div className="text-muted-foreground mb-1">Presale Wallet Address:</div>
                      <div className="text-primary break-all">TBA - Address will be announced when presale begins</div>
                    </div>

                    <Button 
                      className="w-full py-4 text-lg font-bold bg-primary text-black hover:bg-primary/90"
                      disabled={!isConnected || !usdAmount || parseFloat(usdAmount) <= 0}
                      data-testid="button-send-matic"
                    >
                      {usdAmount && parseFloat(usdAmount) > 0 
                        ? `🚀 Send $${parseFloat(usdAmount).toFixed(2)} USD (${(parseFloat(usdAmount) / maticPrice).toFixed(4)} MATIC)`
                        : '🚀 Enter amount to calculate'
                      }
                    </Button>

                    <Card className="bg-destructive/10 border-destructive/30 mt-4">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <strong className="text-destructive">Safety Note:</strong> Tokens will be distributed after the presale concludes. 
                            Please verify the wallet address before sending MATIC. This transaction is irreversible.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Presale Status */}
                <Card className="bg-accent/10 border-accent/30">
                  <CardContent className="p-6 text-center">
                    <Rocket className="h-8 w-8 text-accent mx-auto mb-4" />
                    <h3 className="cyber-text text-xl font-bold text-accent mb-2">
                      🚀 Stay Tuned for Presale Start and Results
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-accent font-bold">Presale Coming Soon</span>
                    </div>
                    <p className="text-muted-foreground">Presale will begin shortly. Stay tuned!</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">© 2025 VeriFyz Protocol. The future of anonymous presence verification.</p>
            <SocialIcons />
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
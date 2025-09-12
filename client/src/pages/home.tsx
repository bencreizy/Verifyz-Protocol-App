import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWeb3 } from '@/hooks/use-web3';
import { UserRegistrationDialog } from '@/components/user-registration-dialog';
import { 
  MapPin, 
  Satellite, 
  FileSignature, 
  Link2, 
  Coins, 
  KeyRound, 
  Shield, 
  Box, 
  Trophy, 
  Bell,
  Wallet,
  Upload,
  Fingerprint,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [usdAmount, setUsdAmount] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const maticPrice = priceData?.maticUsd || 0.85; // Live MATIC/USD price with fallback
  const vfyzPrice = priceData?.vfyzUsd || 0.05; // Live VFYZ token price with fallback

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('backdrop-blur-md');
        } else {
          header.classList.remove('backdrop-blur-md');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineSteps = [
    {
      icon: MapPin,
      title: "User attends real event",
      description: "Physical presence at a specific location and time"
    },
    {
      icon: Satellite,
      title: "GPS and device signature collected",
      description: "Secure collection of location and device fingerprints"
    },
    {
      icon: FileSignature,
      title: "Submission signed with wallet",
      description: "Zero-knowledge proof ensures privacy while maintaining authenticity"
    },
    {
      icon: Link2,
      title: "Blockchain stores verified presence",
      description: "Immutable record stored on decentralized network"
    },
    {
      icon: Coins,
      title: "Lifetime rewards accrue automatically",
      description: "Earn VFYZ tokens for verified presence activities"
    }
  ];

  const features = [
    {
      icon: KeyRound,
      title: "Anonymous Verification",
      description: "Verify your location without exposing your identity. Zero-knowledge proofs ensure complete privacy."
    },
    {
      icon: Shield,
      title: "True Proof of Presence",
      description: "GPS, biometrics & device signals make spoofing impossible. Multi-factor verification ensures authenticity."
    },
    {
      icon: Box,
      title: "Trust on Chain",
      description: "Every presence recorded immutably & rewardable. Transparent and verifiable blockchain records."
    }
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Fingerprint Overlay Background */}
      <div className="fixed inset-0 fingerprint-overlay pointer-events-none z-0"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Fingerprint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-glow" data-testid="logo-text">VeriFyz</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('verify')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="nav-verify"
              >
                Verify
              </button>
              <button
                onClick={() => scrollToSection('presale')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="nav-presale"
              >
                Token Presale
              </button>
              <button
                onClick={() => scrollToSection('api')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="nav-api"
              >
                API
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="nav-about"
              >
                About
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-home"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('verify')}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-verify"
                >
                  Verify
                </button>
                <button
                  onClick={() => scrollToSection('presale')}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-presale"
                >
                  Token Presale
                </button>
                <button
                  onClick={() => scrollToSection('api')}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-api"
                >
                  API
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="mobile-nav-about"
                >
                  About
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-glow" data-testid="text-hero-title">
                VeriFyz Protocol
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-12 font-light" data-testid="text-hero-subtitle">
                Proof of Presence. Verified, Anonymous, Rewarded.
              </p>
              
              <Button 
                variant="gradient" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold"
                data-testid="button-join-movement"
              >
                <Upload className="h-5 w-5 mr-2" />
                Join the Movement
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section id="verify" className="py-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" data-testid="text-how-it-works-title">How It Works</h2>
              <p className="text-xl text-muted-foreground" data-testid="text-how-it-works-subtitle">Anonymous proof of presence in five simple steps</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="flex flex-col lg:flex-row items-center mb-12 lg:mb-8" data-testid={`timeline-step-${index + 1}`}>
                    <div className="flex items-center w-full lg:w-1/5 mb-8 lg:mb-0">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center glow-border mr-4 lg:mr-0">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className="hidden lg:flex flex-1 h-0.5 bg-gradient-to-r from-primary to-accent mx-4"></div>
                      )}
                    </div>
                    <div className="w-full lg:w-4/5 text-center lg:text-left">
                      <h3 className="text-xl font-semibold mb-2" data-testid={`text-step-${index + 1}-title`}>{step.title}</h3>
                      <p className="text-muted-foreground" data-testid={`text-step-${index + 1}-description`}>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" data-testid="text-features-title">Core Features</h2>
              <p className="text-xl text-muted-foreground" data-testid="text-features-subtitle">Revolutionary proof of presence technology</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm glow-border glow-hover" data-testid={`card-feature-${index + 1}`}>
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-6 mx-auto">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4" data-testid={`text-feature-${index + 1}-title`}>{feature.title}</h3>
                      <p className="text-muted-foreground" data-testid={`text-feature-${index + 1}-description`}>{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lifetime Rewards */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm glow-border" data-testid="card-lifetime-rewards">
                <CardContent className="p-8 lg:p-12 text-center">
                  <div className="mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-6">
                      <Trophy className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-rewards-title">Lifetime Reward Winners Selected</h2>
                    <p className="text-xl text-muted-foreground mb-8" data-testid="text-rewards-subtitle">5 wallets chosen randomly. Check if you've been rewarded.</p>
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="glow-hover transition-all duration-300"
                    data-testid="button-get-notified"
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    Get Notified
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Presale Section */}
        <section id="presale" className="py-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" data-testid="text-presale-title">VeriFyz Token Presale</h2>
              <p className="text-xl text-muted-foreground" data-testid="text-presale-subtitle">Join the presale and earn VFYZ tokens</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-card/50 backdrop-blur-sm glow-border" data-testid="card-presale">
                <CardContent className="p-8">
                  {/* Wallet Connect Button */}
                  <div className="text-center mb-8">
                    <Button 
                      variant="gradient" 
                      size="lg" 
                      className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
                      onClick={handleConnectWallet}
                      disabled={isConnecting}
                      data-testid="button-connect-wallet"
                    >
                      <Wallet className="h-5 w-5 mr-2" />
                      {isConnecting ? 'Connecting...' : 
                       isConnected && user ? `${user.username} (${account?.slice(0, 6)}...${account?.slice(-4)})` :
                       isConnected ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}` : 
                       'Connect Wallet'}
                    </Button>
                    {error && (
                      <p className="text-destructive text-sm mt-2" data-testid="text-wallet-error">{error}</p>
                    )}
                  </div>

                  {/* Presale Calculator */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" data-testid="label-usd-amount">USD Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <Input
                          type="number"
                          placeholder="Enter USD amount"
                          className="pl-10"
                          value={usdAmount}
                          onChange={(e) => setUsdAmount(e.target.value)}
                          data-testid="input-usd-amount"
                        />
                      </div>
                    </div>

                    {/* Live Feed Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/50 rounded-lg p-4" data-testid="card-matic-price">
                        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          MATIC/USD
                          {isPriceLoading && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                          {priceData?.source === 'coingecko' && <span className="text-xs text-primary">●LIVE</span>}
                          {priceData?.error && <span className="text-xs text-destructive">●OFFLINE</span>}
                        </div>
                        <div className="text-xl font-bold text-primary" data-testid="text-matic-price">${maticPrice.toFixed(6)}</div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4" data-testid="card-vfyz-price">
                        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          VFYZ Price
                          <span className="text-xs text-accent">●FIXED</span>
                        </div>
                        <div className="text-xl font-bold text-accent" data-testid="text-vfyz-price">${vfyzPrice.toFixed(3)}</div>
                      </div>
                    </div>

                    {/* Token Output */}
                    <div>
                      <label className="block text-sm font-medium mb-2" data-testid="label-vfyz-tokens">VFYZ Tokens</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Coins className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          type="text"
                          readOnly
                          placeholder="0 VFYZ"
                          className="pl-10 bg-secondary/50"
                          value={tokens > 0 ? `${tokens.toLocaleString()} VFYZ` : ''}
                          data-testid="input-vfyz-tokens"
                        />
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Button 
                      variant="gradient" 
                      size="lg" 
                      className="w-full text-lg font-semibold"
                      disabled={!isConnected || !usdAmount || parseFloat(usdAmount) <= 0}
                      data-testid="button-buy-vfyz"
                    >
                      <Coins className="h-5 w-5 mr-2" />
                      Buy VFYZ
                    </Button>

                    {/* Presale Info */}
                    <div className="text-center text-sm text-muted-foreground" data-testid="text-presale-info">
                      <p>Presale runs Sept 15–29 | Launches Oct 6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Proof Submission */}
        <section id="api" className="py-20 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-card/50 backdrop-blur-sm glow-border" data-testid="card-proof-submission">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="text-submit-proof-title">Submit Proof of Presence</h3>
                  <p className="text-muted-foreground mb-8" data-testid="text-submit-proof-description">Verify your attendance at real-world events and earn rewards.</p>
                  
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold"
                    data-testid="button-submit-proof"
                  >
                    <Fingerprint className="h-5 w-5 mr-2" />
                    Submit Proof of Presence
                  </Button>
                  
                  <div className="mt-6 text-sm text-muted-foreground" data-testid="text-submit-proof-note">
                    <p>Coming soon - Full blockchain integration</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="py-12 border-t border-border relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Fingerprint className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-glow" data-testid="footer-logo-text">VeriFyz Protocol</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">Terms of Service</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-whitepaper">Whitepaper</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-github">GitHub</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-discord">Discord</a>
              </div>
              <p className="text-muted-foreground" data-testid="text-copyright">© 2024 VeriFyz Protocol. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* User Registration Dialog */}
      {isConnected && account && (
        <UserRegistrationDialog
          open={showRegistration}
          onOpenChange={setShowRegistration}
          walletAddress={account}
          onRegister={registerUser}
          isRegistering={isRegistering}
        />
      )}
    </div>
  );
}

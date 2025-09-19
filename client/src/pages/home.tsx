
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Zap, Target, Users, Clock, TrendingUp } from 'lucide-react';

export default function Home() {
  const [ethAmount, setEthAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const presaleData = {
    currentPhase: 1,
    totalRaised: 250000,
    maxCap: 1000000,
    tokenPrice: 0.05,
    participants: 1247,
    timeLeft: {
      days: 15,
      hours: 8,
      minutes: 42
    }
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Advanced Verification",
      description: "Multi-layered proof verification system with zero-knowledge protocols"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Sub-second verification times with optimized blockchain integration"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision Accuracy",
      description: "99.9% accuracy rate with AI-powered validation algorithms"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/verifyz-logo.png" 
              alt="VeriFyz Protocol" 
              className="h-20 w-auto"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
          </div>
          
          <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-white to-brand-neon bg-clip-text text-transparent">
            VeriFyz Protocol
          </h1>
          
          <p className="mb-8 text-xl text-gray-300 leading-relaxed">
            The future of decentralized verification is here. Join the revolution with 
            cutting-edge proof-of-verification technology powered by blockchain innovation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="bg-brand-neon/20 text-brand-neon border-brand-neon">
              Phase {presaleData.currentPhase} Live
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {presaleData.participants.toLocaleString()} Participants
            </Badge>
          </div>
        </div>
      </div>

      {/* Presale Section */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Card className="bg-black/40 border-brand-neon/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">
                Token Presale Now Live
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Secure your VFYZ tokens at the best price. Limited time offer.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Countdown Timer */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-neon">{presaleData.timeLeft.days}</div>
                  <div className="text-sm text-gray-400">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-neon">{presaleData.timeLeft.hours}</div>
                  <div className="text-sm text-gray-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-neon">{presaleData.timeLeft.minutes}</div>
                  <div className="text-sm text-gray-400">Minutes</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Progress</span>
                  <span>{((presaleData.totalRaised / presaleData.maxCap) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={(presaleData.totalRaised / presaleData.maxCap) * 100} 
                  className="h-3 bg-gray-800"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>${presaleData.totalRaised.toLocaleString()} raised</span>
                  <span>${presaleData.maxCap.toLocaleString()} goal</span>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="max-w-md mx-auto space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ETH Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      className="bg-black/40 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      VFYZ Tokens
                    </label>
                    <Input
                      type="text"
                      value={ethAmount ? (parseFloat(ethAmount) / presaleData.tokenPrice).toFixed(2) : '0'}
                      readOnly
                      className="bg-gray-800 border-gray-600 text-gray-300"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-neon hover:bg-brand-neon/80 text-black font-semibold py-3"
                  size="lg"
                  onClick={() => setIsConnected(!isConnected)}
                >
                  {isConnected ? 'Purchase Tokens' : 'Connect Wallet'}
                </Button>
                
                <p className="text-xs text-gray-400 text-center">
                  Current price: ${presaleData.tokenPrice} per VFYZ
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-300">
              Built for the future of decentralized verification
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black/40 border-brand-neon/20 hover:border-brand-neon/40 transition-colors">
                <CardHeader>
                  <div className="text-brand-neon mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-16 bg-black/20">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-2">
                {presaleData.participants.toLocaleString()}
              </div>
              <div className="text-gray-400">Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-2">
                ${(presaleData.totalRaised / 1000).toFixed(0)}K
              </div>
              <div className="text-gray-400">Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-2">
                99.9%
              </div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-neon mb-2">
                &lt;1s
              </div>
              <div className="text-gray-400">Verification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

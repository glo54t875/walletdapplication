import { useLocation } from "wouter";
import { TrustBadges } from "@/components/security/trust-badges";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Wallet } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);

  // Show dots after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDotsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocation("/select-wallet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white overflow-hidden">
      {/* 3D Rotating World Globe */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Rotating globe container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="earth-container">
            {/* The 3D Earth globe with continents */}
            <div className="earth">
              {/* Earth base sphere */}
              <div className="earth-sphere"></div>
              {/* Africa continent */}
              <div className="continent africa"></div>
              {/* Europe continent */}
              <div className="continent europe"></div>
              {/* Asia continent */}
              <div className="continent asia"></div>
              {/* North America continent */}
              <div className="continent north-america"></div>
              {/* South America continent */}
              <div className="continent south-america"></div>
              {/* Australia continent */}
              <div className="continent australia"></div>
              {/* Antarctica */}
              <div className="continent antarctica"></div>
              {/* Highlight effect */}
              <div className="earth-highlight"></div>
            </div>
          </div>
        </div>
        
        {/* Connection Dots */}
        {dotsVisible && (
          <>
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full animation-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-300 rounded-full animation-pulse delay-300"></div>
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animation-pulse delay-100"></div>
            <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-blue-300 rounded-full animation-pulse delay-200"></div>
            <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-blue-300 rounded-full animation-pulse delay-150"></div>
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animation-pulse delay-400"></div>
          </>
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-16">
        <main className="max-w-4xl mx-auto">
          <div className="space-y-16">
            <section className="text-center pt-12">
              {/* Wallet Logo */}
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                  <Wallet className="w-20 h-20 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 text-white">
                WalletConnect
              </h1>
              
              <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
                Connect your wallet securely to access Web3 services
              </p>
              
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="gap-2 relative bg-gradient-to-r from-blue-600 to-blue-500 border-0 hover:from-blue-700 hover:to-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Get Started</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </section>

            <TrustBadges />
            
            {/* Additional edge design element */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="text-center text-white/70 pb-8">
              <p>© 2025 WalletConnect. All rights reserved.</p>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add CSS for animations */}
      <style>{`
        /* Pulsing animation for connection dots */
        .animation-pulse {
          animation: pulse 3s infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
        
        /* 3D Earth Globe Animation */
        .earth-container {
          width: 350px;
          height: 350px;
          position: relative;
          perspective: 1000px;
          opacity: 0.95;
          filter: blur(0px);
        }
        
        .earth {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: rotate 25s linear infinite;
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), 
                     inset 0 0 35px rgba(255, 255, 255, 0.3);
          background: rgba(10, 30, 100, 0.2);
        }
        
        @keyframes rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        .earth-sphere {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(30, 50, 120, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.4);
          overflow: hidden;
        }
        
        .continent {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          border-radius: 40%;
        }
        
        /* Continent positions and shapes */
        .africa {
          width: 20%;
          height: 30%;
          left: 45%;
          top: 35%;
          border-radius: 35% 45% 35% 35%;
          transform: rotateZ(10deg);
        }
        
        .europe {
          width: 14%;
          height: 15%;
          left: 45%;
          top: 20%;
          border-radius: 40% 30% 30% 30%;
          transform: rotateZ(-10deg);
        }
        
        .asia {
          width: 30%;
          height: 25%;
          left: 55%;
          top: 20%;
          border-radius: 30% 40% 30% 20%;
        }
        
        .north-america {
          width: 22%;
          height: 20%;
          left: 15%;
          top: 18%;
          border-radius: 30% 30% 40% 30%;
          transform: rotateZ(-15deg);
        }
        
        .south-america {
          width: 12%;
          height: 20%;
          left: 25%;
          top: 45%;
          border-radius: 25% 25% 45% 35%;
          transform: rotateZ(15deg);
        }
        
        .australia {
          width: 12%;
          height: 10%;
          left: 68%;
          top: 55%;
          border-radius: 40%;
          transform: rotateZ(15deg);
        }
        
        .antarctica {
          width: 20%;
          height: 10%;
          left: 40%;
          bottom: 12%;
          border-radius: 40% 40% 30% 45%;
        }
        
        .globe-front {
          background-image: url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M178.2,59.3c-1.6,0.6-5.3,2.3-8,3.8c-2.8,1.5-6.7,2.9-8.8,3.1c-2.2,0.2-4.3,0.8-5,1.6c-0.7,0.7-3,1.7-5.2,2.3c-2.1,0.6-4.4,1.7-5,2.5c-1.4,1.9-8.4,4.2-12.7,4.2c-2.5,0-3.7,0.4-4.6,1.4c-0.7,0.8-2.7,2.1-4.4,2.7c-2.8,1.2-3.1,1.5-3.1,3.6c0,2.1-0.3,2.4-2.7,3.4c-3.2,1.2-4.3,2.9-3.2,4.9c0.6,1,0.5,1.5-0.3,2.5c-0.6,0.8-1.9,1.4-2.8,1.6c-1,0.2-7.3,3.3-14,7c-6.7,3.7-13.9,7.4-16,8.3c-3.3,1.3-4.1,2-5.1,4.1c-1.7,3.4-4.9,5.9-10.6,8.1c-2.7,1.1-5.8,2.6-6.8,3.4c-1,0.8-2.3,1.4-2.8,1.4c-0.5,0-2.4,1.2-4.3,2.7c-1.9,1.5-4.4,3-5.5,3.4c-2.7,0.9-3.9,2.5-4.1,5.8c-0.1,2.3-0.8,3.8-2.9,6.3c-1.5,1.7-3.9,3.6-5.2,4.2c-1.3,0.5-3.3,1.6-4.3,2.5c-1,0.8-3.1,1.7-4.6,2.1c-1.5,0.3-4.9,2-7.3,3.7l-4.5,3v3.5c0,1.9-0.5,5.3-1.1,7.5c-0.6,2.2-0.9,5.4-0.8,7.1c0.2,2.4,0,3.4-1.1,4.8c-2.5,3.1-3,5.7-2.3,10.7c0.4,2.7,0.3,5.1-0.1,6.9c-0.4,1.5-0.9,4.8-1.2,7.4c-0.3,2.6-1.1,6.8-1.7,9.3c-0.7,2.5-1.3,6.6-1.3,9c0,5.1,1.7,11.2,3.5,12.7c2.1,1.6,5.9,9.3,6.5,12.7c0.3,1.9,0.9,4.1,1.5,5.1c1,1.7,1,2.1,0,5.8c-1.2,4.8-1.3,10.4-0.1,15.1c0.9,3.6,4.9,9.5,6.5,9.8c0.5,0.1,1.9,1.5,3.2,3.1c1.2,1.5,3.4,3.7,4.9,4.9c1.5,1.1,3.8,3.5,5.2,5.2c2.3,2.9,2.7,3.1,6.2,3.5c3.9,0.5,7.1,2.2,8.8,4.8c0.6,0.9,2.3,2.5,3.9,3.6c1.5,1.1,3.8,3,5.1,4.4c1.2,1.3,3.7,3.1,5.5,4c2.5,1.1,3.7,2.2,4.9,4.3c0.9,1.5,2.2,3,3,3.4c0.7,0.4,2.3,2.1,3.4,3.8c1.1,1.7,2.9,3.5,4,4.1c1.1,0.5,2.9,2.2,4.1,3.8c1.1,1.6,3.1,3.5,4.3,4.1c1.3,0.7,3.1,2.5,4.1,4.1c1.6,2.5,2.1,2.9,4.6,3.1c2.3,0.2,3.5,0.9,5.8,3.2c1.5,1.5,4.2,3.6,6,4.6c1.8,1,4.1,2.8,5.1,4.1c1.7,2.1,1.9,2.3,5.4,2.3c3.4,0,3.7,0.1,5.1,2.2c0.8,1.1,2.8,3,4.4,4c1.6,1.1,3.8,3,4.9,4.3c1.1,1.3,2.8,2.9,3.9,3.5c1.1,0.6,2.6,2.1,3.4,3.4c2.3,3.8,4,5.1,9.5,7.3c2.7,1.1,6.5,2.7,8.4,3.6c1.8,0.9,5.3,2,7.6,2.4c2.3,0.5,5.7,1.4,7.7,2.1c1.9,0.7,5.5,2.5,8.1,4c2.6,1.5,5.9,3.1,7.5,3.7c1.5,0.6,4.1,2.2,5.8,3.6c3.5,2.9,9.1,6.1,10.2,5.7c1.3-0.5,4.7,1.6,5.7,3.5c0.9,1.9,7.4,5.9,10.1,6.1c1,0.1,2.6,0.8,3.6,1.6c0.9,0.9,3,2.1,4.5,2.7c1.6,0.7,3.9,2.3,5.2,3.6c1.3,1.3,3.5,2.7,4.9,3.1c1.5,0.3,3.5,1.5,4.7,2.5c1.7,1.5,2.7,1.9,5.3,1.9c2.5,0,3.5,0.3,5.3,1.9c2.7,2.4,5.6,3.4,10.2,3.5c3,0.1,4.2,0.4,5.9,1.7c1.1,0.9,3.4,1.8,5.1,2.1c1.7,0.3,3.7,1.3,4.5,2.1c0.8,0.9,2.2,1.7,3.2,2c0.9,0.3,2.4,1.3,3.3,2.3c0.8,1,3,2.6,4.9,3.5c1.8,0.9,3.8,2.5,4.5,3.5c0.6,1,2.5,2.5,4.1,3.2c2.7,1.2,3.7,1.3,9.9,0.9c3.8-0.3,9.8-0.3,13.4,0c4.4,0.3,7.1,0.2,8.7-0.5c1.2-0.5,3.6-1.1,5.3-1.3c1.7-0.3,3.9-0.9,4.8-1.5c0.9-0.5,3.7-1.5,6.3-2c2.5-0.6,6.3-1.9,8.3-3c2-1.1,6.3-2.9,9.7-4.1c3.3-1.2,7.7-3.1,9.7-4.1c2-1.1,5.3-2.3,7.3-2.7c2-0.5,4.3-1.4,5-2.1c0.7-0.7,2.3-1.5,3.4-1.8c1.1-0.3,3.4-1.8,5.1-3.4c1.7-1.6,3.9-3.2,4.9-3.5c1-0.3,2.7-1.8,3.7-3.3c1.1-1.5,2.5-2.7,3.1-2.7c0.7,0,4.2-1.6,7.9-3.6c6.1-3.3,7-3.9,9.1-7.1c1.3-1.9,3.2-4.1,4.3-4.9c1.1-0.7,3-2.9,4.3-4.8c1.3-1.9,3.7-4.3,5.1-5.3c1.5-1,3.5-3.1,4.5-4.7c0.9-1.5,3-4,4.5-5.4c1.6-1.4,3.5-3.7,4.3-5.1c0.8-1.4,3-4,4.9-5.7c1.9-1.7,4.5-4.6,5.7-6.3c1.3-1.7,3.8-4.3,5.5-5.7c1.7-1.4,4.3-3.9,5.6-5.5c1.4-1.7,3.6-4.1,4.9-5.4c1.3-1.3,3.6-3.9,5-5.7c1.4-1.9,3.6-4.1,4.9-5.1c1.3-0.9,3.4-3.3,4.7-5.2c1.3-1.9,3.5-4.1,4.7-5c1.3-0.8,2.9-2.7,3.5-4.2c0.6-1.5,3-4.7,5.3-7.3c2.3-2.5,4.9-5.9,5.8-7.5c1.5-2.8,1.5-3.5,1.2-10c-0.3-3.9-0.3-8.1,0-9.3c0.3-1.8,0.1-2.8-1.2-5.1c-0.9-1.6-2.8-4.5-4.3-6.5c-1.4-1.9-2.6-4.8-2.6-6.3c0-1.5-0.8-4.4-1.7-6.5c-1-2.1-2.5-5.7-3.3-8.1c-0.9-2.4-2.3-5.3-3.1-6.6c-0.9-1.2-2.3-3.9-3.3-6.1c-0.9-2.1-2.5-4.5-3.5-5.4c-1-0.9-2.5-2.9-3.3-4.6c-0.7-1.7-2.8-4.7-4.6-6.7c-1.8-2-4.2-5.3-5.3-7.1c-1.2-1.9-2.8-3.9-3.7-4.5c-0.8-0.6-2.7-2.9-4.3-5.2c-1.5-2.3-3.7-4.8-4.9-5.7c-1.1-0.9-3.2-3.3-4.5-5.5c-1.3-2.1-3.1-4.5-4.1-5.2c-0.9-0.7-2.8-3.1-4.1-5.2c-1.3-2.1-3.3-4.7-4.6-5.7c-1.3-1-3.2-3.4-4.3-5.4c-1.1-2-3.3-4.8-5-6.2c-1.6-1.4-3.8-4.1-4.8-5.9c-1.1-1.8-2.9-4.3-4.1-5.4c-1.3-1.1-2.9-3.4-3.5-5c-0.7-1.6-2.5-4.1-4-5.6c-1.5-1.5-3.9-4.5-5.3-6.7c-1.3-2.3-3.7-5.3-5.2-6.7c-1.5-1.4-3.4-3.9-4.1-5.5c-0.7-1.6-2.5-3.9-4-5c-1.4-1.1-3.7-3.9-5-6.1c-1.3-2.2-3.4-4.8-4.6-5.7c-1.2-0.9-3.5-3.8-5.1-6.3c-1.5-2.5-3.7-5.3-4.9-6.3c-1.2-0.9-3.3-3.4-4.6-5.5c-1.3-2.1-3.6-5.1-5-6.6c-1.5-1.5-3.9-4.9-5.4-7.4c-1.5-2.5-3.5-5-4.5-5.5c-0.9-0.5-2.5-2.5-3.5-4.5c-1.1-2-3.1-4.8-4.4-6.3c-1.3-1.5-2.8-3.7-3.2-4.9c-0.5-1.3-1.9-3.4-3.4-4.7c-1.4-1.3-3.3-3.7-4.1-5.1c-0.8-1.5-2.5-3.7-3.9-4.8c-1.3-1.2-3.1-3.3-3.9-4.7c-0.9-1.4-2.8-3.3-4.1-4.1c-1.3-0.9-3.2-3.5-4.1-5.8c-0.9-2.3-2.7-4.5-4-4.9c-1.3-0.5-2.7-2-3.2-3.5c-0.5-1.4-2.2-3.3-3.8-4.3c-1.6-1-3.4-2.9-4.1-4.3c-0.7-1.4-2.4-3-3.8-3.5c-1.4-0.5-3-1.8-3.6-2.9c-0.6-1.1-2.1-2.7-3.3-3.6c-1.1-0.9-2.7-2.6-3.5-3.7c-0.7-1.2-2.2-2.6-3.2-3.1c-1-0.6-2.3-1.7-2.9-2.5c-0.6-0.8-2.3-2.1-3.7-2.9c-1.4-0.8-3.1-2.3-3.8-3.3c-0.7-1-2.6-2.4-4.2-3.1c-1.6-0.7-3.5-2.1-4.2-3.1c-0.7-1-2.4-2.4-3.8-3.1c-1.3-0.7-3.6-2.3-5-3.6c-1.4-1.3-3.5-2.8-4.6-3.4c-1.1-0.6-2.8-1.9-3.7-3c-0.9-1-2.7-2.3-4-2.9c-1.3-0.5-3.2-1.8-4.2-2.8c-1-1-2.8-2.3-4-2.8c-1.2-0.5-3.1-1.7-4.2-2.5c-1.1-0.9-3.1-2.1-4.5-2.7c-1.3-0.6-3.6-1.9-4.9-2.9c-1.4-1-3.7-2.2-5.2-2.6c-1.5-0.4-3.6-1.7-4.7-2.8c-1.1-1.1-3.1-2.3-4.5-2.6c-1.4-0.3-3.7-1.3-5.1-2.2c-1.4-0.9-4-2.1-5.8-2.7c-1.8-0.6-4.6-1.8-6.3-2.7c-1.7-0.9-4.5-2.1-6.2-2.7c-1.7-0.6-4.5-1.7-6.2-2.5c-1.7-0.8-4.5-1.7-6.3-2.1c-1.8-0.4-4.9-1.4-6.7-2.3c-3.1-1.4-3.7-1.5-8.7-1.5c-5,0-5.5,0.1-8.1,2c-1.6,1.1-4.2,2.5-5.9,3.1C188.4,5.4,185.3,6.4,183.8,7c-1.5,0.6-3.8,1.4-5.1,1.9C177.4,9.4,175.7,9.9,175.1,10.2z' fill='%23ffffff'/%3E%3C/svg%3E");
        }
        
        .globe-back {
          transform: rotateY(180deg);
          background-image: url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M383.8,10.3c-2.5,0.9-7.9,3.4-12,5.6c-4.1,2.2-10,4.3-13.1,4.6c-3.3,0.3-6.5,1.3-7.5,2.4c-1,1-4.5,2.5-7.8,3.4c-3.2,0.9-6.6,2.6-7.6,3.8c-2.1,2.8-12.7,6.3-19.1,6.3c-3.7,0-5.6,0.6-6.9,2.1c-1,1.2-4,3.1-6.5,4.1c-4.2,1.8-4.6,2.3-4.6,5.4c0,3.1-0.4,3.6-4.1,5c-4.8,1.8-6.5,4.4-4.8,7.3c0.9,1.5,0.8,2.3-0.4,3.8c-0.9,1.1-2.8,2.1-4.3,2.4c-1.5,0.3-10.9,5-20.9,10.5c-10,5.5-20.8,11.1-24,12.4c-4.9,2-6.2,3-7.7,6.2c-2.5,5.1-7.3,8.8-15.9,12.2c-4.1,1.6-8.7,3.9-10.2,5c-1.6,1.2-3.4,2.1-4.2,2.1c-0.7,0-3.6,1.8-6.5,4c-2.8,2.2-6.5,4.5-8.2,5c-4.1,1.3-5.9,3.8-6.1,8.7c-0.2,3.5-1.2,5.7-4.4,9.4c-2.3,2.6-5.8,5.4-7.8,6.2c-2,0.8-4.9,2.4-6.5,3.7c-1.5,1.2-4.7,2.6-7,3.1c-2.3,0.5-7.3,3-11,5.5l-6.8,4.6l-0.1,5.2c0,2.8-0.7,7.9-1.6,11.2c-0.9,3.3-1.4,8.1-1.2,10.6c0.3,3.6,0,5.1-1.7,7.2c-3.7,4.7-4.5,8.5-3.5,16.1c0.6,4,0.5,7.6-0.2,10.3c-0.6,2.2-1.4,7.2-1.9,11c-0.4,3.9-1.6,10.1-2.6,13.9c-1.1,3.8-1.9,9.9-1.9,13.5c0,7.7,2.6,16.8,5.3,19c3.1,2.4,8.9,13.9,9.7,19c0.4,2.8,1.4,6.2,2.3,7.7c1.5,2.5,1.5,3.1,0,8.6c-1.9,7.2-2,15.6-0.2,22.7c1.4,5.4,7.3,14.3,9.8,14.7c0.8,0.2,2.9,2.2,4.8,4.6c1.8,2.3,5.1,5.6,7.3,7.3c2.2,1.7,5.7,5.2,7.8,7.7c3.5,4.3,4.1,4.6,9.3,5.3c5.8,0.7,10.7,3.3,13.1,7.1c0.9,1.4,3.5,3.8,5.8,5.4c2.3,1.6,5.7,4.5,7.6,6.5c1.8,2,5.5,4.7,8.2,6c3.7,1.7,5.6,3.3,7.4,6.4c1.3,2.2,3.3,4.5,4.5,5c1.1,0.6,3.4,3.1,5.1,5.6c1.7,2.6,4.4,5.3,6,6.1c1.7,0.7,4.4,3.3,6.1,5.6c1.7,2.4,4.6,5.2,6.4,6.2c1.9,1,4.6,3.8,6.1,6.2c2.4,3.8,3.1,4.3,6.9,4.6c3.4,0.3,5.2,1.3,8.6,4.8c2.3,2.3,6.3,5.4,9,6.9c2.7,1.4,6.2,4.2,7.7,6.1c2.5,3.2,2.9,3.4,8.1,3.4c5.1,0,5.6,0.2,7.7,3.3c1.2,1.7,4.2,4.5,6.6,6c2.4,1.6,5.7,4.5,7.3,6.5c1.6,2,4.2,4.4,5.9,5.2c1.6,0.9,3.9,3.2,5.1,5.1c3.4,5.7,6,7.7,14.2,10.9c4.1,1.6,9.8,4,12.6,5.4c2.7,1.3,7.9,3,11.4,3.6c3.4,0.7,8.6,2.1,11.5,3.2c2.8,1.1,8.3,3.8,12.2,6c3.9,2.2,8.9,4.7,11.2,5.5c2.3,0.9,6.2,3.3,8.7,5.4c5.2,4.4,13.7,9.2,15.3,8.5c2-0.8,7.1,2.4,8.5,5.3c1.3,2.9,11.1,8.9,15.1,9.2c1.5,0.1,3.9,1.2,5.4,2.4c1.4,1.3,4.5,3.1,6.8,4.1c2.4,1,5.9,3.4,7.8,5.4c1.9,2,5.2,4.1,7.3,4.7c2.2,0.5,5.3,2.2,7.1,3.8c2.6,2.3,4.1,2.8,7.9,2.8c3.8,0,5.2,0.5,7.9,2.8c4.1,3.6,8.4,5.1,15.3,5.2c4.5,0.1,6.3,0.6,8.8,2.5c1.7,1.3,5.1,2.7,7.7,3.2c2.5,0.4,5.5,1.9,6.7,3.1c1.2,1.3,3.3,2.6,4.8,3c1.4,0.4,3.6,2,4.9,3.5c1.2,1.5,4.5,3.9,7.3,5.3c2.7,1.4,5.7,3.8,6.7,5.3c0.9,1.5,3.7,3.7,6.2,4.8c4,1.8,5.5,1.9,14.8,1.3c5.7-0.4,14.7-0.4,20.1,0c6.6,0.5,10.6,0.3,13-0.7c1.8-0.7,5.4-1.6,8-1.9c2.5-0.4,5.8-1.3,7.2-2.2c1.4-0.8,5.6-2.2,9.4-3c3.8-0.9,9.4-2.9,12.4-4.5c3-1.6,9.5-4.4,14.5-6.2c5-1.8,11.6-4.6,14.5-6.2c3-1.6,7.9-3.5,10.9-4.1c3-0.7,6.4-2.1,7.5-3.1c1.1-1.1,3.4-2.3,5.1-2.7c1.7-0.4,5.1-2.7,7.6-5.1c2.5-2.4,5.8-4.8,7.4-5.3c1.5-0.5,4.1-2.7,5.6-4.9c1.6-2.2,3.7-4,4.6-4c1,0,6.3-2.4,11.8-5.4c9.2-4.9,10.5-5.9,13.6-10.7c1.9-2.9,4.8-6.2,6.4-7.4c1.6-1.1,4.5-4.4,6.5-7.2c2-2.9,5.5-6.4,7.7-7.9c2.3-1.5,5.3-4.6,6.7-7c1.4-2.3,4.5-6,6.8-8.1c2.4-2.1,5.3-5.6,6.4-7.7c1.2-2.1,4.5-6,7.3-8.5c2.8-2.6,6.7-6.9,8.6-9.5c2-2.6,5.7-6.5,8.3-8.5c2.6-2.1,6.4-5.8,8.4-8.3c2.1-2.5,5.4-6.2,7.4-8.1c2-1.9,5.4-5.8,7.5-8.5c2.1-2.8,5.4-6.2,7.3-7.6c1.9-1.4,5.1-4.9,7.1-7.8c2-2.8,5.2-6.2,7.1-7.5c1.9-1.2,4.3-4.1,5.2-6.3c0.9-2.2,4.5-7.1,8-10.9c3.5-3.8,7.4-8.9,8.7-11.3c2.2-4.2,2.3-5.2,1.8-15c-0.4-5.8-0.4-12.1,0-14c0.5-2.7,0.1-4.2-1.8-7.7c-1.4-2.4-4.2-6.8-6.4-9.7c-2.1-2.9-3.9-7.2-3.9-9.4c0-2.2-1.2-6.6-2.6-9.8c-1.5-3.1-3.7-8.6-5-12.2c-1.3-3.6-3.4-8-4.6-9.9c-1.3-1.8-3.4-5.9-4.9-9.1c-1.4-3.1-3.8-6.7-5.3-8.1c-1.5-1.3-3.7-4.4-4.9-6.9c-1.1-2.5-4.2-7-6.9-10.1c-2.7-3-6.3-7.9-8-10.7c-1.8-2.9-4.2-5.9-5.5-6.8c-1.2-0.9-4.1-4.4-6.4-7.8c-2.3-3.4-5.6-7.2-7.4-8.5c-1.7-1.3-4.8-5-6.7-8.2c-1.9-3.2-4.7-6.7-6.1-7.8c-1.4-1.1-4.2-4.6-6.1-7.8c-1.9-3.2-5-7-6.9-8.5c-1.9-1.4-4.8-5.1-6.5-8.1c-1.7-3-5-7.2-7.5-9.3c-2.4-2.1-5.7-6.1-7.2-8.9c-1.6-2.7-4.4-6.4-6.2-8.1c-1.9-1.7-4.3-5.1-5.3-7.5c-1.1-2.4-3.8-6.2-6-8.4c-2.3-2.2-5.8-6.8-7.9-10.1c-2-3.4-5.6-7.9-7.8-10c-2.3-2.1-5.1-5.8-6.2-8.2c-1.1-2.4-3.8-5.8-6-7.5c-2.1-1.7-5.5-5.8-7.5-9.1c-2-3.3-5.1-7.2-6.9-8.6c-1.8-1.4-5.2-5.7-7.6-9.5c-2.3-3.8-5.6-8-7.4-9.4c-1.8-1.4-4.9-5.1-6.9-8.2c-2-3.1-5.4-7.6-7.5-9.9c-2.2-2.3-5.8-7.3-8.1-11.1c-2.3-3.8-5.3-7.5-6.7-8.3c-1.4-0.7-3.8-3.8-5.3-6.8c-1.6-3-4.6-7.2-6.6-9.4c-2-2.2-4.2-5.5-4.8-7.4c-0.7-1.9-2.9-5.1-5.1-7.1c-2.1-2-4.9-5.5-6.1-7.7c-1.2-2.2-3.8-5.5-5.8-7.2c-1.9-1.8-4.6-4.9-5.9-7c-1.4-2.1-4.2-5.5-6.2-7.5c-2-2-4.8-5.2-6.2-7.1c-1.3-1.9-4.1-4.7-6.1-6.2c-2-1.5-5.2-5.2-7.1-8.2c-1.9-3-5.1-6.7-7.1-8.2c-2-1.5-4.8-4.4-6.1-6.5c-1.4-2.1-4.5-5-7-6.5c-2.4-1.5-5.7-4.5-7.3-6.8c-1.6-2.3-4.6-5.1-6.7-6.3c-2.1-1.1-5.1-3.9-6.7-6.1c-1.6-2.2-4.6-4.8-6.7-5.9c-2.1-1.1-5.3-3.9-7.1-6.2c-1.8-2.3-5.4-5.3-8-6.6c-2.6-1.3-5.8-3.9-7.2-5.8c-1.3-1.9-4.1-4.4-6.2-5.5c-2.1-1.1-5.7-3.8-8-6.1c-2.3-2.3-5.9-5-7.9-6.1c-2-1-5.3-3.5-7.3-5.5c-1.9-2-5.8-4.6-8.5-5.8c-2.8-1.2-7-3.8-9.3-5.7c-2.3-1.9-6.5-4.5-9.3-5.7c-2.8-1.2-6.6-3.6-8.5-5.5c-1.9-1.8-5.5-4.1-8-5.2c-2.5-1-6.9-3.6-9.7-5.6c-2.9-2-7.3-4.6-9.9-5.7c-2.6-1.1-6.8-3.5-9.3-5.4c-2.5-1.9-6.7-4.1-9.5-5c-2.7-0.9-7.3-3.2-10.1-5.1c-4.6-3.1-5.5-3.3-13.6-3.3c-8.1,0-9,0.2-13.3,3.3c-2.6,1.8-6.9,4.1-9.6,5.1C391.3,8,386.3,9.4,383.8,10.3z' fill='%23ffffff'/%3E%3C/svg%3E");
        }
        
        .earth-highlight {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0) 60%);
          z-index: 2;
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .earth-container {
            width: 280px;
            height: 280px;
          }
          
          .continent {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
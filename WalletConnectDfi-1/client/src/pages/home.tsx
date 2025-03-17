import { useLocation } from "wouter";
import { TrustBadges } from "@/components/security/trust-badges";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import EarthGlobe from "@/components/earth/EarthGlobe";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLocation("/select-wallet");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Earth Globe Background */}
      <EarthGlobe />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <main className="max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-16">
              <section className="text-center pt-8 sm:pt-12">
                {/* Logo */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="bg-white/30 p-6 sm:p-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-sm">
                    <img 
                      src="/images/logo.png"
                      alt="Wallet Logo"
                      className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                </div>

                {/* Text with enhanced visibility */}
                <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  WalletConnect
                </h1>

                <p className="text-xl sm:text-2xl text-white mb-8 sm:mb-12 max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] px-4">
                  Connect your wallet securely to access Web3 services
                </p>

                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto gap-2 relative bg-gradient-to-r from-blue-600 to-blue-500 border-0 hover:from-blue-700 hover:to-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
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
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </section>

              <TrustBadges />

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
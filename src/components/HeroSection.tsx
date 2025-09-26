import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import LiquidEther from "./LiquidEther";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#0A0F0D', '#22C55E', '#9EDFC7']}
          mouseForce={25}
          cursorSize={150}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.6}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.4}
          autoResumeDelay={4000}
          autoRampDuration={0.8}
        />
      </div>
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Health,{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Our Priority
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
          Chat instantly with our Health Bot and explore wellness resources designed to support your journey to better health.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/chatbot"
            className="glass-button-primary flex items-center space-x-2 group"
          >
            <MessageCircle size={20} />
            <span>Get Started</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/about"
            className="glass-button-secondary flex items-center space-x-2"
          >
            <span>Learn More</span>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="glass-panel bg-orange-500/20 border border-orange-400/30 px-6 py-4 rounded-2xl max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-medium">
            ⚠️ <strong>Important:</strong> This chatbot is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
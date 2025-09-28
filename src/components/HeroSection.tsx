import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import LiquidEther from "./LiquidEther";
import GlassSurface from "./GlassSurface";
import ClickSpark from "./ClickSpark";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#134E5E', '#71B280']}
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
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Your Health,{" "}
            <span className="bg-gradient-to-r from-[#71B280] to-[#A8D5BA] bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Chat instantly with our Health Bot and explore wellness resources designed to support your journey to better health.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={20}
            sparkCount={8}
            duration={500}
          >
            <Link
              to="/chatbot"
              className="bg-gradient-to-r from-primary to-primary-glow text-white font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <MessageCircle size={20} />
              <span>Get Started</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ClickSpark>
          
          <ClickSpark
            sparkColor="#71B280"
            sparkSize={10}
            sparkRadius={20}
            sparkCount={8}
            duration={500}
          >
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Learn More</span>
            </Link>
          </ClickSpark>
        </div>

        {/* Disclaimer */}
        <div className="p-6 max-w-2xl mx-auto bg-orange-900/20 backdrop-blur-sm rounded-2xl border border-orange-500/30">
          <p className="text-orange-100 text-sm font-medium">
            ⚠️ <strong>Important:</strong> This chatbot is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
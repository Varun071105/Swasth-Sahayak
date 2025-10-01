import GlassNavbar from "@/components/GlassNavbar";
import ScrollFloat from "@/components/ScrollFloat";
import Footer from "@/components/Footer";
import { Heart, Users, Shield, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart size={24} />,
      title: "Compassionate Care",
      description: "We believe everyone deserves access to reliable health information and support."
    },
    {
      icon: <Users size={24} />,
      title: "Community Focused",
      description: "Building a supportive community where health and wellness knowledge is shared."
    },
    {
      icon: <Shield size={24} />,
      title: "Trusted Information",
      description: "All our content is reviewed and based on evidence-based medical practices."
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Access",
      description: "Get immediate access to health resources and AI-powered assistance 24/7."
    }
  ];

  return (
    <div className="min-h-screen">
      <GlassNavbar />
      
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
...
          {/* Important Notice */}
          <div className="glass-panel bg-orange-500/20 border border-orange-400/30 p-6 text-center">
            <h3 className="text-2xl font-semibold text-orange-100 mb-3">
              Medical Disclaimer
            </h3>
            <p className="text-orange-100/90 leading-relaxed">
              HealthConnect provides general health information for educational purposes only. 
              Our AI assistant and resources are not intended to replace professional medical advice, 
              diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
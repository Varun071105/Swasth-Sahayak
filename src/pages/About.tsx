import GlassNavbar from "@/components/GlassNavbar";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GlassNavbar />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Swasth Sahayak
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your trusted companion in health and wellness, powered by advanced AI technology
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-panel bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-400/30 p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Swasth Sahayak is dedicated to making quality health information accessible to everyone. 
              We combine cutting-edge AI technology with reliable medical knowledge to provide personalized 
              health guidance, diet planning, and wellness support. Our platform empowers individuals to 
              make informed decisions about their health and well-being.
            </p>
          </div>

          {/* Core Values */}
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glass-panel bg-slate-800/50 border-white/10 p-6 hover:border-green-400/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-white/70">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="glass-panel bg-orange-500/20 border border-orange-400/30 p-6 text-center">
            <h3 className="text-2xl font-semibold text-orange-100 mb-3">
              Medical Disclaimer
            </h3>
            <p className="text-orange-100/90 leading-relaxed">
              Swasth Sahayak provides general health information for educational purposes only. 
              Our AI assistant and resources are not intended to replace professional medical advice, 
              diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

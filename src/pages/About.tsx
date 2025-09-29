import GlassNavbar from "@/components/GlassNavbar";
import ScrollFloat from "@/components/ScrollFloat";
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
          <div className="text-center mb-16">
            <ScrollFloat
              containerClassName="mb-6"
              textClassName="text-5xl md:text-6xl font-bold text-white !text-5xl md:!text-6xl"
            >
              About Swasth-Sahaya
            </ScrollFloat>
            <ScrollFloat
              containerClassName=""
              textClassName="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto !text-xl !font-normal"
            >
              Empowering individuals with accessible health information and AI-powered assistance to make informed decisions about their well-being.
            </ScrollFloat>
          </div>

          {/* Mission Statement */}
          <div className="glass-panel p-8 mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4 text-center">Our Mission</h2>
            <p className="text-white/80 text-lg leading-relaxed text-center">
              To democratize access to health information and provide intelligent, 
              personalized wellness guidance through cutting-edge AI technology, 
              while always emphasizing the importance of professional medical care.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {values.map((value, index) => (
              <div key={value.title} className="glass-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
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
              HealthConnect provides general health information for educational purposes only. 
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
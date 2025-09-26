import { Heart, Dumbbell, Brain, Shield } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      icon: <Heart size={32} />,
      title: "Nutrition",
      description: "Get personalized nutrition advice and meal planning to fuel your body right.",
      color: "from-red-400 to-pink-400"
    },
    {
      icon: <Dumbbell size={32} />,
      title: "Exercise",
      description: "Discover workout routines and fitness tips tailored to your goals and fitness level.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Brain size={32} />,
      title: "Mental Health",
      description: "Access resources for stress management, mindfulness, and emotional well-being.",
      color: "from-purple-400 to-indigo-400"
    },
    {
      icon: <Shield size={32} />,
      title: "First Aid",
      description: "Learn essential first aid techniques and emergency response procedures.",
      color: "from-green-400 to-emerald-400"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Health Resources
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our wide range of health and wellness resources designed to support every aspect of your well-being.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card group cursor-pointer animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon with Gradient Background */}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 text-center">
                {feature.title}
              </h3>
              
              <p className="text-white/70 text-center leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-panel bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 px-8 py-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Ready to start your health journey?
            </h3>
            <p className="text-white/80 mb-4">
              Our AI health assistant is here to help you 24/7
            </p>
            <a
              href="/chatbot"
              className="inline-flex items-center glass-button-primary"
            >
              Chat with Health Bot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
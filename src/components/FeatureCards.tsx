import { Heart, Dumbbell, Brain, Shield } from "lucide-react";
import GlassSurface from "./GlassSurface";
import ClickSpark from "./ClickSpark";
import ScrollFloat from "./ScrollFloat";

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
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-4xl md:text-5xl font-bold text-white !text-4xl md:!text-5xl"
          >
            Comprehensive Health Resources
          </ScrollFloat>
          <ScrollFloat
            containerClassName=""
            textClassName="text-xl text-white/70 max-w-2xl mx-auto !text-xl !font-normal"
          >
            Explore our wide range of health and wellness resources designed to support every aspect of your well-being.
          </ScrollFloat>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ClickSpark
              key={feature.title}
              sparkColor="#71B280"
              sparkSize={12}
              sparkRadius={22}
              sparkCount={10}
              duration={700}
            >
              <div
                className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group"
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
              </div>
            </ClickSpark>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="p-8 max-w-2xl mx-auto">
            <ScrollFloat
              containerClassName="mb-3"
              textClassName="text-2xl font-semibold text-white !text-2xl"
            >
              Ready to start your health journey?
            </ScrollFloat>
            <ScrollFloat
              containerClassName="mb-6"
              textClassName="text-white/80 !text-base !font-normal"
            >
              Our AI health assistant is here to help you 24/7
            </ScrollFloat>
            <ClickSpark
              sparkColor="#71B280"
              sparkSize={14}
              sparkRadius={25}
              sparkCount={12}
              duration={800}
            >
              <a
                href="/chatbot"
                className="bg-black/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-black/30 hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Chat with Health Bot
              </a>
            </ClickSpark>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
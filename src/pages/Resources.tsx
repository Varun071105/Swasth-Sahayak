import GlassNavbar from "@/components/GlassNavbar";
import ScrollFloat from "@/components/ScrollFloat";
import { ExternalLink, Download, BookOpen, Video } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Nutrition Guides",
      icon: <BookOpen size={24} />,
      resources: [
        { name: "Balanced Diet Essentials", type: "PDF Guide", link: "#" },
        { name: "Meal Planning Template", type: "Download", link: "#" },
        { name: "Healthy Recipes Collection", type: "Web Resource", link: "#" }
      ]
    },
    {
      title: "Exercise & Fitness",
      icon: <Video size={24} />,
      resources: [
        { name: "Beginner Workout Routines", type: "Video Series", link: "#" },
        { name: "Stretching Guide", type: "PDF Guide", link: "#" },
        { name: "Fitness Tracker Template", type: "Download", link: "#" }
      ]
    },
    {
      title: "Mental Health",
      icon: <BookOpen size={24} />,
      resources: [
        { name: "Stress Management Techniques", type: "Article", link: "#" },
        { name: "Mindfulness Meditation Guide", type: "Audio Guide", link: "#" },
        { name: "Sleep Hygiene Checklist", type: "PDF Guide", link: "#" }
      ]
    },
    {
      title: "Emergency Care",
      icon: <ExternalLink size={24} />,
      resources: [
        { name: "Basic First Aid Manual", type: "PDF Guide", link: "#" },
        { name: "Emergency Contacts Template", type: "Download", link: "#" },
        { name: "CPR Quick Reference", type: "Infographic", link: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <GlassNavbar />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollFloat
              containerClassName="mb-6"
              textClassName="text-5xl md:text-6xl font-bold text-white !text-5xl md:!text-6xl"
            >
              Health Resources
            </ScrollFloat>
            <ScrollFloat
              containerClassName=""
              textClassName="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto !text-xl !font-normal"
            >
              Comprehensive collection of health guides, tools, and educational materials to support your wellness journey.
            </ScrollFloat>
          </div>

          {/* Resource Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {resourceCategories.map((category) => (
              <div key={category.title} className="glass-card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.resources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.link}
                      className="flex items-center justify-between p-4 glass-panel hover:bg-white/15 transition-colors group"
                    >
                      <div>
                        <h3 className="text-white font-medium group-hover:text-green-300 transition-colors">
                          {resource.name}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {resource.type}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {resource.type.includes("Download") ? (
                          <Download size={16} className="text-white/60 group-hover:text-green-300 transition-colors" />
                        ) : (
                          <ExternalLink size={16} className="text-white/60 group-hover:text-green-300 transition-colors" />
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="glass-panel bg-blue-500/20 border border-blue-400/30 p-8 text-center">
            <h2 className="text-3xl font-semibold text-blue-100 mb-4">
              More Resources Coming Soon!
            </h2>
            <p className="text-blue-100/80 text-lg mb-6">
              We're continuously expanding our library of health resources. 
              Check back regularly for new guides, tools, and educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chatbot" className="glass-button-primary">
                Chat with Health Bot
              </a>
              <a href="/" className="glass-button-secondary">
                Back to Home
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass-panel bg-orange-500/20 border border-orange-400/30 p-6 text-center mt-8">
            <p className="text-orange-100/90 text-sm">
              <strong>Disclaimer:</strong> All resources are for educational purposes only. 
              Always consult healthcare professionals for medical advice and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
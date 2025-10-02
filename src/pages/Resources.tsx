import GlassNavbar from "@/components/GlassNavbar";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GlassNavbar />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Health Resources
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive guides and resources to support your health journey
            </p>
          </div>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {resourceCategories.map((category, index) => (
              <div 
                key={index}
                className="glass-panel bg-slate-800/50 border-white/10 p-6 hover:border-green-400/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {category.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.link}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                    >
                      <div>
                        <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                          {resource.name}
                        </p>
                        <p className="text-white/60 text-sm">{resource.type}</p>
                      </div>
                      <ExternalLink size={18} className="text-white/60 group-hover:text-green-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
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

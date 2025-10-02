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
...
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
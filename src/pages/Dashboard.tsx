import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import GlassNavbar from "@/components/GlassNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, Stethoscope, Bot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const dashboardFeatures = [
    {
      title: "Vaccination Schedules",
      description: "Track and manage your vaccination appointments and reminders",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      action: () => console.log("Vaccination feature coming soon")
    },
    {
      title: "Personalized Health & Diet Planner",
      description: "Get customized health and nutrition plans based on your profile",
      icon: Users,
      color: "from-green-500 to-green-600",
      action: () => console.log("Diet planner feature coming soon")
    },
    {
      title: "Report Analyzer",
      description: "Upload and analyze your medical reports with AI assistance",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      action: () => console.log("Report analyzer feature coming soon")
    },
    {
      title: "Symptoms to Disease Analysis",
      description: "Get insights about potential conditions based on your symptoms",
      icon: Stethoscope,
      color: "from-red-500 to-red-600",
      action: () => console.log("Symptom analyzer feature coming soon")
    },
    {
      title: "Health Chatbot",
      description: "Chat with our AI health assistant for instant support",
      icon: Bot,
      color: "from-teal-500 to-teal-600",
      action: () => navigate("/chatbot")
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GlassNavbar />
      
      <div className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome Back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Your personal health dashboard - track, analyze, and improve your wellness journey
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                onClick={feature.action}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    variant="ghost" 
                    className="text-white/80 hover:text-white hover:bg-white/10 group-hover:bg-white/20"
                  >
                    {feature.title === "Health Chatbot" ? "Start Chat" : "Coming Soon"}
                    <Plus className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white">Health Score</CardTitle>
                <div className="text-3xl font-bold text-green-400">85%</div>
                <CardDescription className="text-white/70">Based on your recent activities</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white">Next Appointment</CardTitle>
                <div className="text-2xl font-bold text-blue-400">Dec 15</div>
                <CardDescription className="text-white/70">Annual checkup with Dr. Smith</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white">Active Goals</CardTitle>
                <div className="text-3xl font-bold text-purple-400">3</div>
                <CardDescription className="text-white/70">Fitness and nutrition goals</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
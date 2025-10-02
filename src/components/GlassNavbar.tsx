import { useState, useEffect } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassSurface from "./GlassSurface";
import ClickSpark from "./ClickSpark";
import { supabase } from "@/integrations/supabase/client";
import logo from '@/assets/logo-main.png';

const GlassNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <GlassSurface
      width="100%"
      height={80}
      borderRadius={0}
      className="glass-navbar fixed top-0 left-0 right-0 z-50"
      backgroundOpacity={0.1}
    >
      <nav className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Name */}
          <ClickSpark
            sparkColor="#71B280"
            sparkSize={8}
            sparkRadius={15}
            sparkCount={6}
            duration={400}
          >
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img 
                src={logo} 
                alt="Swasth Sahayak Logo" 
                className="h-8 md:h-10 w-auto object-contain" 
              />
              <span className="text-base md:text-lg lg:text-xl font-bold text-white whitespace-nowrap">
                Swasth Sahayak
              </span>
            </Link>
          </ClickSpark>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <ClickSpark
                  key={link.name}
                  sparkColor="#71B280"
                  sparkSize={6}
                  sparkRadius={12}
                  sparkCount={5}
                  duration={300}
                >
                  <Link
                    to={link.path}
                    className={`text-white/90 hover:text-white transition-colors duration-300 font-medium px-3 xl:px-4 py-2 rounded-lg hover:bg-white/10 text-sm ${
                      location.pathname === link.path ? "text-white bg-white/10" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </ClickSpark>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-2 xl:ml-4">
              <ClickSpark
                sparkColor="#71B280"
                sparkSize={8}
                sparkRadius={15}
                sparkCount={6}
                duration={400}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 text-sm h-9"
                  onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
                >
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  <span className="hidden xl:inline">Dashboard</span>
                </Button>
              </ClickSpark>
              
              {!user ? (
                <ClickSpark
                  sparkColor="#71B280"
                  sparkSize={8}
                  sparkRadius={15}
                  sparkCount={6}
                  duration={400}
                >
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 text-sm h-9">
                      <LogIn className="w-4 h-4 mr-1.5" />
                      <span className="hidden xl:inline">Login</span>
                    </Button>
                  </Link>
                </ClickSpark>
              ) : (
                <ClickSpark
                  sparkColor="#71B280"
                  sparkSize={8}
                  sparkRadius={15}
                  sparkCount={6}
                  duration={400}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 text-sm h-9"
                    onClick={() => supabase.auth.signOut()}
                  >
                    <span className="hidden xl:inline">Logout</span>
                    <span className="xl:hidden">Exit</span>
                  </Button>
                </ClickSpark>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-1">
            <ClickSpark
              sparkColor="#71B280"
              sparkSize={6}
              sparkRadius={12}
              sparkCount={4}
              duration={300}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 px-2"
                onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
              >
                <LayoutDashboard className="w-4 h-4" />
              </Button>
            </ClickSpark>
            
            {!user && (
              <ClickSpark
                sparkColor="#71B280"
                sparkSize={6}
                sparkRadius={12}
                sparkCount={4}
                duration={300}
              >
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 px-2">
                    <LogIn className="w-4 h-4" />
                  </Button>
                </Link>
              </ClickSpark>
            )}
            
            <ClickSpark
              sparkColor="#71B280"
              sparkSize={8}
              sparkRadius={15}
              sparkCount={6}
              duration={400}
            >
              <button
                className="text-white p-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </ClickSpark>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <ClickSpark
                  key={link.name}
                  sparkColor="#71B280"
                  sparkSize={6}
                  sparkRadius={12}
                  sparkCount={5}
                  duration={300}
                >
                  <Link
                    to={link.path}
                    className={`text-white/90 hover:text-white transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10 ${
                      location.pathname === link.path ? "text-white bg-white/10" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </ClickSpark>
              ))}
              
              {user && (
                <ClickSpark
                  sparkColor="#71B280"
                  sparkSize={6}
                  sparkRadius={12}
                  sparkCount={5}
                  duration={300}
                >
                  <Button 
                    variant="outline" 
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 w-full justify-start"
                    onClick={() => {
                      supabase.auth.signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </ClickSpark>
              )}
            </div>
          </div>
        )}
      </nav>
    </GlassSurface>
  );
};

export default GlassNavbar;
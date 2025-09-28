import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GlassSurface from "./GlassSurface";
import ClickSpark from "./ClickSpark";
import logo from "@/assets/logo.png";

const GlassNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
      className="glass-navbar"
      backgroundOpacity={0.1}
    >
      <nav className="w-full px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <ClickSpark
            sparkColor="#71B280"
            sparkSize={8}
            sparkRadius={15}
            sparkCount={6}
            duration={400}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Swasth-Sahaya Logo" className="w-10 h-10" />
              <span className="text-white font-semibold text-xl">Swasth-Sahaya</span>
            </Link>
          </ClickSpark>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
                  className={`text-white/90 hover:text-white transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10 ${
                    location.pathname === link.path ? "text-white bg-white/10" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </ClickSpark>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <ClickSpark
            sparkColor="#71B280"
            sparkSize={8}
            sparkRadius={15}
            sparkCount={6}
            duration={400}
          >
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </ClickSpark>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
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
            </div>
          </div>
        )}
      </nav>
    </GlassSurface>
  );
};

export default GlassNavbar;
import { useState } from "react";
import { Home, Info, MessageCircle, BookOpen, LayoutDashboard, User, LogIn, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClickSpark from "./ClickSpark";

interface BubbleMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const BubbleMenu = ({ isAuthenticated, onLogout }: BubbleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Chatbot", path: "/chatbot", icon: MessageCircle },
    { name: "Resources", path: "/resources", icon: BookOpen },
    ...(isAuthenticated 
      ? [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "Profile", path: "/profile", icon: User },
        ]
      : [{ name: "Login", path: "/auth", icon: LogIn }]
    ),
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bubble Menu Items */}
      <div className="fixed bottom-24 right-6 z-50 lg:hidden">
        {isOpen && (
          <div className="flex flex-col-reverse gap-3 mb-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <ClickSpark
                  key={item.name}
                  sparkColor="#71B280"
                  sparkSize={8}
                  sparkRadius={15}
                  sparkCount={6}
                  duration={400}
                >
                  <button
                    onClick={() => handleItemClick(item.path)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-full
                      bg-white/10 backdrop-blur-lg border border-white/20
                      hover:bg-white/20 transition-all duration-300
                      animate-scale-in shadow-lg
                      ${isActive ? 'bg-white/25 border-white/40' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  </button>
                </ClickSpark>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <ClickSpark
          sparkColor="#71B280"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={10}
          duration={600}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-16 h-16 rounded-full
              bg-gradient-to-r from-primary to-secondary
              shadow-2xl shadow-primary/50
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110 active:scale-95
              ${isOpen ? 'rotate-45' : 'rotate-0'}
            `}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <div className="relative">
                <div className="w-6 h-0.5 bg-white rounded-full mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white rounded-full mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </ClickSpark>
      </div>
    </>
  );
};

export default BubbleMenu;

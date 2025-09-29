import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollFloat from "@/components/ScrollFloat";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Health Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Tell me about nutrition",
    "Exercise recommendations",
    "Mental health tips",
    "First aid basics"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes("nutrition") || text.includes("food") || text.includes("diet")) {
      return "Great question about nutrition! 🥗 A balanced diet should include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Would you like specific meal planning tips or information about any particular dietary concerns?";
    }
    
    if (text.includes("exercise") || text.includes("workout") || text.includes("fitness")) {
      return "Exercise is fantastic for your health! 💪 I recommend at least 150 minutes of moderate aerobic activity per week, plus strength training twice a week. What's your current fitness level, and what type of activities do you enjoy?";
    }
    
    if (text.includes("mental") || text.includes("stress") || text.includes("anxiety")) {
      return "Mental health is just as important as physical health! 🧠 Some effective stress management techniques include deep breathing, meditation, regular exercise, and maintaining social connections. Would you like me to guide you through a quick breathing exercise?";
    }
    
    if (text.includes("first aid") || text.includes("emergency")) {
      return "First aid knowledge can save lives! 🚑 Key basics include: checking for responsiveness, calling emergency services, controlling bleeding with pressure, and knowing CPR. Would you like information about any specific first aid technique?";
    }
    
    return "Thank you for your question! While I can provide general health information, remember that I'm not a substitute for professional medical advice. For specific health concerns, please consult with a healthcare provider. Is there a particular health topic you'd like to learn more about?";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="glass-navbar relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <ScrollFloat
                  containerClassName=""
                  textClassName="text-white font-semibold !text-base !font-semibold"
                >
                  Health Assistant
                </ScrollFloat>
                <p className="text-white/70 text-sm">Online • Ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end space-x-3 ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? "bg-green-500 text-white rounded-br-md"
                    : "glass-panel text-white rounded-bl-md"
                }`}
              >
                <p className="text-sm md:text-base">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.isUser && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="glass-panel text-white rounded-bl-md px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/70 text-sm mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  className="glass-panel px-4 py-2 text-white/90 hover:text-white hover:bg-white/15 transition-colors text-sm rounded-full"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="flex space-x-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your health question..."
              className="flex-1 glass-panel px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="glass-button-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
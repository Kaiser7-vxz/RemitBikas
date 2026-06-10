import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';

export default function AIBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Namaste! I am the RemitBikas AI Assistant. How can I help you track projects or invest today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'ai', text: 'This is a demo AI response. I can help answer questions about local projects and investments in the future!' }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 bg-white rounded-full shadow-2xl hover:shadow-emerald-300/50 transition-all hover:-translate-y-1 z-50 p-1 border-2 border-emerald-200"
            title="RemitBikas AI Assistant"
          >
            <img src="/ai-bot-icon.png" alt="AI Assistant" className="w-14 h-14 rounded-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src="/ai-bot-icon.png" alt="AI" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-300/50" />
                <div>
                  <h3 className="font-bold text-lg leading-tight flex items-center gap-1">RemitBikas AI <Sparkles className="w-4 h-4 text-emerald-300"/></h3>
                  <p className="text-xs text-emerald-100 font-medium">● Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-sm shadow-sm' 
                        : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-gray-800 font-medium placeholder-gray-400"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-emerald-700 text-white p-3 rounded-xl hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

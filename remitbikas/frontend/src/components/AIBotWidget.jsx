import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { api } from '../lib/api';

const DEFAULT_MESSAGE = { 
  role: 'assistant', 
  content: 'Namaste! I am the RemitBikas AI Assistant. How can I help you track projects or invest today?' 
};

export default function AIBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from local storage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem('remitbikas_ai_chat');
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        // Ensure it's an array and has the new format (role/content) instead of the old one (sender/text)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].role) {
          setMessages(parsed);
        } else {
          setMessages([DEFAULT_MESSAGE]);
          localStorage.removeItem('remitbikas_ai_chat');
        }
      } catch (e) {
        setMessages([DEFAULT_MESSAGE]);
      }
    } else {
      setMessages([DEFAULT_MESSAGE]);
    }
  }, []);

  // Save chat history to local storage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('remitbikas_ai_chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await api.sendChatMessage(updatedMessages);
      setMessages([...updatedMessages, { role: 'assistant', content: response.content }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: '**Error:** I am having trouble connecting to my brain right now. Please make sure the backend is running and the GEMINI_API_KEY is set!' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem('remitbikas_ai_chat');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 150)}
        initial={false}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        onClick={() => { if (!isDragging && !isOpen) setIsOpen(true); }}
        className={`fixed bottom-6 lg:bottom-8 right-6 lg:right-8 bg-white rounded-full shadow-2xl hover:shadow-emerald-300/50 transition-shadow z-50 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing ${isOpen ? 'pointer-events-none' : ''}`}
        style={{ touchAction: 'none' }}
        title="RemitBikas AI Assistant"
      >
        <img src="/ai-bot-icon.png" alt="AI Assistant" className="w-11 h-11 lg:w-14 lg:h-14 rounded-full object-cover pointer-events-none m-0 p-0 block" />
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
            style={{ touchAction: 'none' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-5 flex justify-between items-center cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-3 pointer-events-none">
                <img src="/ai-bot-icon.png" alt="AI" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-300/50" />
                <div>
                  <h3 className="font-bold text-lg leading-tight flex items-center gap-1">RemitBikas AI <Sparkles className="w-4 h-4 text-emerald-300" /></h3>
                  <p className="text-xs text-emerald-100 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleClearChat} className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors cursor-pointer z-50" title="Clear Chat">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors cursor-pointer z-50" title="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div
              className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-4 scroll-smooth"
              style={{ touchAction: 'auto' }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-sm shadow-sm' : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'}`}>
                    {msg.role === 'assistant' ? (
                      <div className="text-sm space-y-2 leading-relaxed">
                        <ReactMarkdown 
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({node, ...props}) => <a className="text-emerald-300 font-medium underline underline-offset-2 hover:text-emerald-400" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Only if no history or just starting) */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-white" onPointerDown={(e) => e.stopPropagation()}>
                {["What active projects can I fund?", "How does RemitBikas ensure transparency?", "What is RemitBikas?"].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors font-medium whitespace-nowrap cursor-pointer z-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div
              className="p-4 bg-white border-t border-gray-100"
              style={{ touchAction: 'auto' }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-gray-800 font-medium placeholder-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-700 text-white p-3 rounded-xl hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer z-50 flex items-center justify-center min-w-[48px]"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
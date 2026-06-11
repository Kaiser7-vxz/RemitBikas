import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, AlertTriangle, Send, User, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import { io } from 'socket.io-client';
import { api } from '../lib/api';
import { API_URL } from '../lib/constants';

function readStoredUser() {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'complaint'
  const user = readStoredUser();

  // Chat State
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Complaint State
  const [complaintForm, setComplaintForm] = useState({ title: '', category: 'Infrastructure', description: '' });
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  useEffect(() => {
    // 1. Fetch initial chat history
    const fetchHistory = async () => {
      try {
        const response = await api.request('/community/messages');
        setMessages(response.data || []);
      } catch (error) {
        console.error('Failed to load history', error);
      } finally {
        setIsChatLoading(false);
        scrollToBottom();
      }
    };
    fetchHistory();

    // 2. Setup Socket.IO
    // Determine backend base URL from API_URL
    const backendUrl = API_URL.startsWith('http') ? new URL(API_URL).origin : 'http://localhost:5000';
    const newSocket = io(backendUrl, { withCredentials: true });
    
    newSocket.on('connect', () => {
      newSocket.emit('join_community');
    });

    newSocket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !socket) return;

    socket.emit('send_message', {
      content: chatInput.trim(),
      authorId: user?.id || null,
      authorName: user?.name || `Citizen-${Math.floor(Math.random() * 9000) + 1000}`,
    });

    setChatInput('');
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    if (!complaintForm.title || !complaintForm.description) return;
    
    setIsSubmittingComplaint(true);
    try {
      await api.request('/community/complaints', {
        method: 'POST',
        body: JSON.stringify({
          ...complaintForm,
          submittedBy: user?.id || null,
        }),
      });
      setComplaintSuccess(true);
      setComplaintForm({ title: '', category: 'Infrastructure', description: '' });
      setTimeout(() => setComplaintSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit complaint', error);
      alert('Error submitting complaint. Please try again later.');
    } finally {
      setIsSubmittingComplaint(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Header Section */}
      <section className="container mx-auto px-6 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Community <span className="text-emerald-600">Hub</span></h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Join the conversation, stay informed about municipal projects, or report any issues directly to the authorities. Your voice matters.
        </p>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[700px] max-h-[85vh]">
          
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-64 lg:w-80 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col gap-4 flex-shrink-0">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Channel</h3>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all text-left group ${activeTab === 'chat' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-100'}`}
            >
              <MessageSquare className={`w-6 h-6 ${activeTab === 'chat' ? 'text-emerald-100' : 'text-emerald-600 group-hover:scale-110 transition-transform'}`} />
              <div>
                <span className="block font-bold">Live Discussion</span>
                <span className={`text-xs ${activeTab === 'chat' ? 'text-emerald-100' : 'text-gray-500'}`}>Public real-time chat</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('complaint')}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all text-left group ${activeTab === 'complaint' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-100'}`}
            >
              <AlertTriangle className={`w-6 h-6 ${activeTab === 'complaint' ? 'text-red-100' : 'text-red-500 group-hover:scale-110 transition-transform'}`} />
              <div>
                <span className="block font-bold">Complaint Box</span>
                <span className={`text-xs ${activeTab === 'complaint' ? 'text-emerald-100' : 'text-gray-500'}`}>Report issues securely</span>
              </div>
            </button>

            <div className="mt-auto hidden md:block">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <ShieldAlert className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-emerald-900 text-sm mb-1">Safe Space Policy</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Please be respectful. Hate speech, spam, and misinformation will be strictly moderated and may result in a ban.
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Content Pane */}
          <div className="flex-1 bg-white relative flex flex-col h-full overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full w-full absolute inset-0"
                >
                  {/* Chat Header */}
                  <div className="p-5 border-b border-gray-100 bg-white/80 backdrop-blur-md z-10 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Public Live Discussion</h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {messages.length} messages loaded</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 flex flex-col gap-4">
                    {isChatLoading ? (
                      <div className="flex justify-center items-center h-full text-emerald-600">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center text-gray-400 my-auto">No messages yet. Start the conversation!</div>
                    ) : (
                      messages.map((msg, idx) => {
                        const isMe = msg.authorName === user?.name;
                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id || idx}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 border border-emerald-200">
                                {msg.author?.avatar ? <img src={msg.author.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" /> : <User className="w-4 h-4" />}
                              </div>
                              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <span className="text-xs text-gray-500 mb-1 font-medium ml-1">
                                  {msg.authorName} <span className="text-gray-300 mx-1">•</span> 
                                  {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isMe ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
                                  {msg.content}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    {!user && (
                      <p className="text-xs text-amber-600 mb-2 font-medium bg-amber-50 p-2 rounded-lg inline-block border border-amber-100">
                        You are participating anonymously.
                      </p>
                    )}
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow text-gray-800 font-medium placeholder-gray-400"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        <span className="hidden sm:inline">Send</span>
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'complaint' && (
                <motion.div
                  key="complaint"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full w-full absolute inset-0 overflow-y-auto"
                >
                  <div className="p-8 max-w-2xl mx-auto w-full">
                    <div className="mb-8 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Submit a Complaint</h2>
                      <p className="text-gray-600">Report delays, corruption, or infrastructure quality issues. Your report will be sent directly to municipal oversight committees.</p>
                    </div>

                    <form onSubmit={handleComplaintSubmit} className="space-y-6">
                      {complaintSuccess && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                          <p className="font-medium text-sm">Your complaint has been submitted successfully and will be reviewed shortly. Thank you!</p>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Complaint Title</label>
                        <input
                          type="text"
                          required
                          value={complaintForm.title}
                          onChange={(e) => setComplaintForm({...complaintForm, title: e.target.value})}
                          placeholder="e.g., Substandard materials used in Ward 4 road"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium bg-gray-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                        <select
                          value={complaintForm.category}
                          onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium bg-gray-50 focus:bg-white appearance-none"
                        >
                          <option value="Infrastructure Quality">Infrastructure Quality</option>
                          <option value="Project Delay">Project Delay</option>
                          <option value="Corruption / Fraud">Corruption / Fraud</option>
                          <option value="Environmental Concern">Environmental Concern</option>
                          <option value="Safety Issue">Safety Issue</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                        <textarea
                          required
                          rows="5"
                          value={complaintForm.description}
                          onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                          placeholder="Please provide specific details, location, and any evidence you have..."
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium bg-gray-50 focus:bg-white resize-none"
                        ></textarea>
                      </div>

                      {!user && (
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                          <p className="text-sm text-amber-800 font-medium">
                            <strong>Note:</strong> You are submitting this complaint anonymously. We will not be able to follow up with you for additional details.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingComplaint}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmittingComplaint ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                        Submit Secure Complaint
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

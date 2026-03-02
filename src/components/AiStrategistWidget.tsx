'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat, UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AiStrategistWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [localInput, setLocalInput] = useState('');

    const chatState = useChat({
        transport: new DefaultChatTransport({ api: '/api/ai-strategist' }),
        messages: [
            {
                id: '1',
                role: 'assistant',
                parts: [{ type: 'text', text: "Tell me about your business. What industry are you in, and what's your biggest growth challenge right now?" }],
            }
        ],
    });

    const { messages, sendMessage, status } = chatState;
    const isLoading = status === 'submitted' || status === 'streaming';

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!localInput.trim() || isLoading) return;

        sendMessage({ text: localInput });
        setLocalInput('');
    };

    const getMessageText = (m: any) => {
        if (m.parts && Array.isArray(m.parts)) {
            return m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('');
        }
        return m.content || '';
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-ai-card border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-ai-blue/10 flex items-center justify-center border border-ai-blue/30">
                                    <Bot size={18} className="text-ai-blue" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Nouskun Growth Strategist</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-zinc-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white transition-colors p-1"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-ai-black/50 custom-scrollbar"
                            data-lenis-prevent
                        >
                            {messages.map((m: any) => {
                                const textContent = getMessageText(m);
                                return (
                                    <div
                                        key={m.id}
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {/* Avatar */}
                                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-white/10' : 'bg-ai-blue/10 border border-ai-blue/30'
                                                }`}>
                                                {m.role === 'user' ? <User size={14} className="text-zinc-300" /> : <Bot size={14} className="text-ai-blue" />}
                                            </div>

                                            {/* Message Bubble */}
                                            <div className={`p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user'
                                                ? 'bg-ai-blue text-white rounded-tr-none'
                                                : 'bg-white/5 text-zinc-200 border border-white/5 rounded-tl-none'
                                                }`}>
                                                {textContent}

                                                {/* Detect if CTA is likely present to show button */}
                                                {m.role === 'assistant' && textContent.toLowerCase().includes('book') && textContent.toLowerCase().includes('call') && (
                                                    <div className="mt-4 pt-3 border-t border-white/10">
                                                        <a href="#contact" onClick={() => setIsOpen(false)} className="inline-block w-full text-center py-2 px-4 bg-white text-black font-semibold rounded-md text-xs hover:bg-zinc-200 transition-colors">
                                                            Book Strategy Call
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-ai-blue/10 border border-ai-blue/30 flex items-center justify-center">
                                            <Bot size={14} className="text-ai-blue" />
                                        </div>
                                        <div className="p-3 rounded-lg rounded-tl-none bg-white/5 border border-white/5 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-ai-card border-t border-white/5">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    value={localInput}
                                    onChange={(e) => setLocalInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-ai-black border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-ai-blue/50 transition-colors placeholder:text-zinc-600"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !localInput.trim()}
                                    className="absolute right-1.5 p-1.5 bg-ai-blue rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors cursor-pointer"
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                </button>
                            </form>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-zinc-600">AI-powered responses. Not automated hype.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 md:right-8 w-14 h-14 bg-white hover:bg-zinc-200 text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all z-50 group border border-white/20"
            >
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
                {isOpen ? (
                    <X size={24} className="group-hover:scale-110 transition-transform" />
                ) : (
                    <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                )}
            </button>

            {/* Basic Style block for custom scrollbar embedded inside component for portability */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
        </>
    );
}

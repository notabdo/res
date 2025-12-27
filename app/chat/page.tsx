"use client"

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { theme, setTheme } = useTheme();

    const suggestions = [
        'العنوان',
        'مواعيد العمل',
        'الفحوصات والأسعار',
        'رقم التواصل'
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.scrollBy(0, -100); // تعويض 50px للأعلى مثلاً
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text) => {
        const messageText = text || input;
        if (!messageText.trim() || loading) return;

        const userMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage]
                })
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.message
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, there was an error processing your request.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        sendMessage(suggestion);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        sendMessage();
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-[#bd334ae3]/80 w-full backdrop-blur-[3px] z-50 p-2 shadow-md fixed top-0">
                <div className="max-w-4xl mx-auto flex items-center justify-center">
                    <h1 className="text-sm font-semibold">مخصص للرد علي الاستفسارات السريعه و البسيطه فقط.</h1>
                    <Button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="bg-[#bd334ae3]/90 mx-2"
                    >
                        {theme === "light" ? <Sun /> : <Moon />}
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 mt-14 mb-30">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-[#700000] flex items-center justify-center flex-shrink-0">
                                    <img
                                        className="heart"
                                        src="/ruby.png"
                                        alt="Next.js logo"
                                    />
                                </div>
                            )}
                            <div
                                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-[#bd334ae3]/80 '
                                    : ' border-dashed border border-black dark:border-white/60'
                                    }`}
                            >
                                {msg.content}
                            </div>
                            {/* {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                    <User size={20} className="text-white" />
                                </div>
                            )} */}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-[#700000] flex items-center justify-center flex-shrink-0">
                                <img
                                    className="heart"
                                    src="/ruby.png"
                                    alt="Next.js logo"
                                />                            </div>
                            <div className="px-4 py-2 rounded-2xl shadow-sm">
                                <div className="flex gap-1">
                                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="border-t dark:bg-gray-900/70 p-4 w-full backdrop-blur-[3px] fixed bottom-0">
                <div className="max-w-4xl mx-auto">
                    {messages.length <= 1 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {suggestions.map((suggestion, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    disabled={loading}
                                    className="px-4 py-2 text-foreground bg-[#bd334ae3]/70  rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Input
                            onFocus={scrollToBottom}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            placeholder="Type your message..."
                            disabled={loading}
                            className=" rounded-2xl !ring-[#bd334ae3]/80 text-foreground"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !input.trim()}
                            className="px-6 py-3 bg-[#bd334ae3] rounded-full hover:bg-[#bd334ae3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
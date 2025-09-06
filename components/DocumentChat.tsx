'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DocumentChatProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentChat = ({ roomId, isOpen, onClose }: DocumentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<'openai' | 'gemini'>('openai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          roomId,
          provider,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.answer,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle specific error types
        let errorContent = 'Sorry, I encountered an error. Please try again.';
        
        if (data.error === 'quota_exceeded') {
          errorContent = "I'm currently experiencing high demand and my API quota has been exceeded. Please try again later, or consider upgrading your AI plan. In the meantime, you can still collaborate on your document!";
        } else if (data.error === 'safety_blocked') {
          errorContent = "I'm unable to process this request due to safety guidelines. Please try rephrasing your question or ask about a different topic.";
        } else if (data.error === 'api_error') {
          errorContent = "I'm having trouble connecting to the AI service right now. Please check your internet connection and try again in a few moments.";
        } else if (data.answer) {
          // If there's an answer even with an error, show it
          errorContent = data.answer;
        }
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: errorContent,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered a network error. Please check your connection and try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] rounded-sm overflow-hidden bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300" style={{ height: '100vh', maxHeight: '100vh' }}>
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-white/60">Document Chat</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full w-9 h-9 p-0 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        
        {/* Provider Selector */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-white/60">AI Provider:</span>
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setProvider('openai')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
                provider === 'openai'
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              OpenAI
            </button>
            <button
              onClick={() => setProvider('gemini')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all duration-200",
                provider === 'gemini'
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              Gemini
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-transparent to-gray-900/20 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-white/80 mt-24">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Welcome to AI Chat</h4>
            <p className="text-white/70 mb-6 text-sm">Ask questions about your document and get intelligent responses</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-3">
              <p className="text-sm font-medium text-white/90 mb-3">💡 Try asking:</p>
              <div className="space-y-2">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 hover:bg-blue-500/20 transition-colors cursor-pointer">
                  <p className="text-sm text-blue-300">"What is this document about?"</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 hover:bg-purple-500/20 transition-colors cursor-pointer">
                  <p className="text-sm text-purple-300">"Summarize the main points"</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 hover:bg-emerald-500/20 transition-colors cursor-pointer">
                  <p className="text-sm text-emerald-300">"What are the key takeaways?"</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                'flex animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
                message.type === 'user' ? 'justify-end' : 'justify-start',
                'style={{ animationDelay: `${index * 100}ms` }}'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-3xl px-5 py-4 shadow-xl transition-all duration-200 hover:shadow-2xl',
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-12'
                    : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm mr-12'
                )}
              >
                <div className="flex items-start gap-3">
                  {message.type === 'assistant' && (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-50 mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="bg-white/10 text-white border border-white/20 rounded-3xl px-5 py-4 backdrop-blur-sm shadow-xl mr-12">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-white/80 font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-8 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="relative">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about this document..."
                className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 rounded-2xl px-5 py-4 pr-12 transition-all duration-200"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-white/50 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Press Enter to send, Shift+Enter for new line
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChat;

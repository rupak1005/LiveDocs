'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DocumentChat from './DocumentChat';

interface ChatButtonProps {
  roomId: string;
}

const ChatButton = ({ roomId }: ChatButtonProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsChatOpen(true)}
        className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 transition-all duration-200 hover:shadow-lg group"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="font-medium">AI Chat</span>
        </div>
      </Button>
      
      <DocumentChat
        roomId={roomId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default ChatButton;

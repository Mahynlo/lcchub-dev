'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Chatbot.css';
import { MessageCircle, ChevronDown, Send } from 'lucide-react';
import { askChatbot } from '@/lib/api/chatbotApi';

interface Message {
  text: string;
  sender: 'user' | 'server';
}

const ChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [isSending, setIsSending] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || isSending) return;

    const updatedMessages: Message[] = [
      ...messages,
      { text: newMessage, sender: 'user' },
    ];
    setMessages(updatedMessages);
    setNewMessage('');
    setIsSending(true);

    try {
      const serverResponseMessage = await askChatbot(newMessage);
      setMessages([
        ...updatedMessages,
        { text: serverResponseMessage, sender: 'server' },
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { text: 'Error al obtener respuesta del servidor.', sender: 'server' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Resizer drag logic
  useEffect(() => {
    const resizer = resizerRef.current;
    const container = document.querySelector('.chat-tab-container') as HTMLElement;
    if (!resizer || !container || isMinimized) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = container.offsetWidth;
      const startHeight = container.offsetHeight;

      const doDrag = (e: MouseEvent) => {
        const newWidth = Math.max(260, startWidth + (e.clientX - startX) * -1);
        const newHeight = Math.max(300, startHeight + (e.clientY - startY) * -1);
        container.style.width = `${newWidth}px`;
        container.style.height = `${newHeight}px`;
      };

      const stopDrag = () => {
        document.removeEventListener('mousemove', doDrag);
        document.removeEventListener('mouseup', stopDrag);
      };

      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    resizer.addEventListener('mousedown', handleMouseDown);
    return () => resizer.removeEventListener('mousedown', handleMouseDown);
  }, [isMinimized]);

  // Tamaño del contenedor al minimizar/expandir
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isMinimized) {
      container.style.width = '52px';
      container.style.height = '52px';
      container.style.minHeight = '0';
      container.style.right = '24px';
      container.style.bottom = '24px';
      container.style.left = '';
      container.style.top = '';
    } else {
      container.style.width = '320px';
      container.style.height = '480px';
      container.style.minHeight = '300px';
      container.style.right = '24px';
      container.style.bottom = '24px';
      container.style.left = '';
      container.style.top = '';
    }
  }, [isMinimized]);

  return (
    <div>
      <div
        ref={containerRef}
        className={`chat-tab-container ${isChatOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}
      >
        {/* Resizer — solo visible cuando está expandido */}
        {!isMinimized && <div className="resizer" ref={resizerRef} />}

        {/* Header */}
        <div
          className={`chat-header ${isMinimized ? 'minimized' : ''}`}
          onClick={handleMinimizeChat}
        >
          {isMinimized ? (
            <MessageCircle size={22} color="white" />
          ) : (
            <>
              <div className="chat-header-info">
                <div className="chat-title">Asistente LCC</div>
                <div className="chat-subtitle">
                  <span className="chat-status-dot" />
                  En línea
                </div>
              </div>
              <div className="minimize-button">
                <ChevronDown size={16} color="white" />
              </div>
            </>
          )}
        </div>

        {/* Cuerpo del chat */}
        {!isMinimized && (
          <>
            <div className="chat-messages" ref={messagesContainerRef}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>
                  ¡Hola! ¿En qué puedo ayudarte hoy?
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {isSending && (
                <div className="message server" style={{ opacity: 0.6 }}>
                  Escribiendo…
                </div>
              )}
            </div>

            <div className="chat-input">
              <textarea
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isSending}
              />
              <button
                className="chat-send-button"
                onClick={handleSendMessage}
                disabled={isSending || newMessage.trim() === ''}
                aria-label="Enviar mensaje"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatTab;

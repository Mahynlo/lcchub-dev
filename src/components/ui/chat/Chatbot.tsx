'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Chatbot.css';
import { MessageCircle } from 'lucide-react'; // Importa el icono
import { askChatbot } from '@/lib/api/chatbotApi';  // Importa la función desde chatbotApi.ts

interface Message {
  text: string;
  sender: 'user' | 'server';
}

const ChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const resizerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    const updatedMessages: Message[] = [
      ...messages,
      { text: newMessage, sender: 'user' },
    ];
    setMessages(updatedMessages);
    setNewMessage('');

    try {
      // Usamos la función askChatbot importada desde chatbotApi.ts
      const serverResponseMessage = await askChatbot(newMessage);
      const updatedMessagesWithServerResponse: Message[] = [
        ...updatedMessages,
        { text: serverResponseMessage, sender: 'server' },
      ];

      setMessages(updatedMessagesWithServerResponse);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { text: 'Error al obtener respuesta del servidor.', sender: 'server' }
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = Math.max(200, startWidth + deltaX * -1); // crecer hacia la izquierda
        const newHeight = Math.max(200, startHeight + deltaY * -1); // crecer hacia arriba

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isMinimized) {
      container.style.width = '50px';
      container.style.height = '50px';
      container.style.left = '';  // Restaurar posición por defecto
      container.style.top = '';
      container.style.right = '20px';
      container.style.bottom = '20px';
      container.style.position = 'fixed';
    } else {
      container.style.width = '300px';
      container.style.height = '500px';
      container.style.right = '20px';
      container.style.bottom = '20px';
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
        {!isMinimized && <div className="resizer" ref={resizerRef}></div>}
        <div className={`chat-header ${isMinimized ? 'minimized' : ''}`} onClick={handleMinimizeChat}>
          {!isMinimized ? (
            <div className="chat-title">Asistente virtual</div>
          ) : (
            <MessageCircle size={24} /> // Mostrar el icono de chat cuando está minimizado
          )}
          {!isMinimized && <div className="minimize-button">-</div>}
        </div>

        {!isMinimized && (
          <>
            <div className="chat-messages" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <textarea
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSendMessage}>Enviar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatTab;

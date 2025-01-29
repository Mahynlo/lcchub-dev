'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './Chatbot.css';
import axios from 'axios';
import { MessageCircle } from 'lucide-react'; // Importa el icono

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
        const formData = new FormData();
        formData.append('user_prompt', newMessage);
  
        const response = await axios.post(
          'http://127.0.0.1:5110/api/prompt_route',
          formData,
          { withCredentials: true }
        );
  
        const serverResponseMessage: string =
          response.data.Answer || 'No hay respuesta disponible.';
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
  
    return (
      <div>
        <div
          className={`chat-tab-container ${isChatOpen ? 'open' : ''} ${
            isMinimized ? 'minimized' : ''
          }`}
        >
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

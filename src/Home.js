import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';

import Background from './components/Background';
import ChatBox from './components/ChatBox';
import QuickSuggestions from './components/QuickSuggestions';
import handleBotResponse from './bot/handleBotResponse';

import furia1 from './assets/imagens/furia1.jpg';
import furia2 from './assets/imagens/furia2.jpg';
import furia3 from './assets/imagens/furia3.jpg';
import furia4 from './assets/imagens/furia4.jpg';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👊 Fala, torcedor da FURIA! Manda sua pergunta ou mostre sua torcida! 🐆🖤' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);        // Referência ao input de texto
  const scrollRef = useRef(null);       // Referência usada para manter o scroll no fim da conversa

  const imagens = [furia1, furia2, furia3, furia4];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Troca automática de imagem de fundo a cada 20 segundos com efeito de fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % imagens.length);
        setFade(true);
      }, 1000);
    }, 20000);

    return () => clearInterval(interval);
  }, [imagens.length]);

  // Faz o scroll descer automaticamente para a última mensagem
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envia a mensagem do usuário e a resposta do bot
  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    const botText = handleBotResponse(input);
    const botMsg = { from: 'bot', text: botText };
    setMessages(prev => [...prev, botMsg]);

    setInput('');
  }

  // Preenche o input com uma sugestão e envia
  function handleQuickSelect(texto) {
    setInput(texto);
    setTimeout(() => {
      sendMessage();
      inputRef.current?.focus();
    }, 100);
  }

  // Tela inicial antes de abrir o chat
  if (!showChat) {
    return (
      <div className="position-relative text-light">
        <Background image={imagens[current]} fade={fade} />
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <h1 className="mb-3">Bem-vindo ao Universo FURIA 🐆</h1>
          <p className="mb-4">Conecte-se com o time de CS em tempo real!</p>
          <button className="btn btn-outline-light btn-lg" onClick={() => setShowChat(true)}>
            Iniciar Chat
          </button>
        </div>
      </div>
    );
  }

  // Interface do chat ativa
  return (
    <div className="min-vh-100 min-vw-100 bg-black">
      <div className="container py-4 bg-dark text-light min-vh-100">
        <h2 className="text-center mb-4">Chat FURIOSO</h2>
        <ChatBox messages={messages} scrollRef={scrollRef} />
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-outline-light" onClick={sendMessage}>
            Enviar
          </button>
        </div>
        <QuickSuggestions onSelect={handleQuickSelect} />
      </div>
    </div>
  );
}

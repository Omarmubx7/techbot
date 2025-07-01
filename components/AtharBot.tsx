"use client";
import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
// @ts-ignore
import doctors from '../app/doctors.json';

export interface AtharBotProps {
  onClose?: () => void;
}

const fuse = new Fuse<any>(doctors, {
  keys: ['name', 'department', 'school'],
  threshold: 0.4,
});

const AtharBot: React.FC<AtharBotProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { sender: 'bot', text: 'Welcome to AtharBot! 👋\n\njust type the first name of the professor you are looking for' },
  ]);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Debounced search effect
  useEffect(() => {
    let active = true;
    if (query.trim().length > 0) {
      setIsLoading(true);
      const handler = setTimeout(() => {
        if (!active) return;
        const results = fuse.search(query.trim()).slice(0, 5);
        setSearchSuggestions(results.map((r: any) => r.item));
        setShowSuggestions(true);
        setSelectedSuggestion(0); // auto-select first suggestion
        setIsLoading(false);
      }, 250); // 250ms debounce
      return () => {
        active = false;
        clearTimeout(handler);
      };
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [query]);

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));
    setIsTyping(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    const userMsg = { sender: 'user', text: query };
    setMessages((msgs: any[]) => [...msgs, userMsg]);
    await simulateTyping();
    let found = fuse.search(query.trim()).map((res: any) => res.item);
    found = found.sort((a: any, b: any) => {
      const q = query.trim().toLowerCase();
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName === q) return -1;
      if (bName === q) return 1;
      if (aName.startsWith(q)) return -1;
      if (bName.startsWith(q)) return 1;
      return 0;
    });
    setQuery('');
    setShowSuggestions(false);
    setSearchSuggestions([]);
    setIsLoading(false);
    if (found.length === 0) {
      setMessages((msgs: any[]) => [
        ...msgs,
        {
          sender: 'bot',
          text:
            "I couldn't find any professors matching your search. Try searching by name, department, or school. For example:\n• Computer Science\n• Dr. Mohammad\n• Cyber Security",
        },
      ]);
    } else {
      setMessages((msgs: any[]) => [...msgs, { sender: 'bot', doc: found[0] }]);
    }
  };

  const handleSuggestionClick = async (suggestion: any) => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
    setIsLoading(true);
    setMessages((msgs: any[]) => [...msgs, { sender: 'user', text: suggestion.name }]);
    await simulateTyping();
    setIsLoading(false);
    setMessages((msgs: any[]) => [...msgs, { sender: 'bot', doc: suggestion }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && searchSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion((prev: number) => (prev < searchSuggestions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion((prev: number) => (prev > 0 ? prev - 1 : searchSuggestions.length - 1));
      } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
        e.preventDefault();
        handleSuggestionClick(searchSuggestions[selectedSuggestion]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    }
  };

  const highlightText = (text: string, query: string): React.ReactNode[] => {
    if (!query.trim()) return [<React.Fragment key={0}>{text}</React.Fragment>];
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex) as string[];
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <React.Fragment key={index}><span className="search-highlight" style={{ background: '#ffe5e5', borderRadius: 3 }}>{part}</span></React.Fragment>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  const renderOfficeHours = (office_hours: any) => {
    if (!office_hours) return null;
    return (
      <div className="mt-2">
        <h3 className="font-semibold text-blue-600 mb-1">Office Hours:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          {Object.entries(office_hours).map(([day, hours]) => (
            <li key={day}>
              <span className="font-medium">{day}:</span> {hours}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
        maxWidth: 380,
        width: '100%',
        minHeight: 520,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#e74c3c',
          color: '#fff',
          padding: '16px 20px 12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/team-athar-logo.png" alt="Athar Bot Logo" style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', padding: 2 }} />
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: 0.5 }}>AtharBot</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', marginLeft: 8 }}
            aria-label="Close Chat"
          >
            ×
          </button>
        )}
      </div>
      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          padding: 20,
          background: '#fafbfc',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg: any, idx: number) =>
            msg.sender === 'user' ? (
              <motion.div
                key={idx}
                className="athar-bubble-user"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                aria-label="User message"
                style={{ alignSelf: 'flex-end', background: '#e74c3c', color: '#fff', padding: '10px 16px', borderRadius: 14, maxWidth: '75%', fontWeight: 500, fontSize: 15, boxShadow: '0 1px 4px rgba(231,76,60,0.06)' }}
              >
                {msg.text}
              </motion.div>
            ) : msg.doc ? (
              <motion.div
                key={idx}
                className="athar-bubble-bot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                aria-label="Bot message"
                style={{ alignSelf: 'flex-start', background: '#f3f3f7', color: '#23252b', padding: '12px 16px', borderRadius: 14, maxWidth: '85%', fontSize: 15, border: '1px solid #e0e0e0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{msg.doc.name}</div>
                  <div style={{ fontSize: 13, marginBottom: 2 }}>{msg.doc.department} - {msg.doc.school}</div>
                  <div style={{ fontSize: 13, marginBottom: 2 }}>
                    Email: <a
                      href={`https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(msg.doc.email)}&subject=Inquiry%20from%20AtharBot`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#e74c3c', textDecoration: 'underline' }}
                    >
                      {msg.doc.email}
                    </a>
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 2 }}>Office: {msg.doc.office}</div>
                  {renderOfficeHours(msg.doc.office_hours)}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={idx}
                className="athar-bubble-bot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                aria-label="Bot message"
                style={{ alignSelf: 'flex-start', background: '#f3f3f7', color: '#23252b', padding: '12px 16px', borderRadius: 14, maxWidth: '85%', fontSize: 15, border: '1px solid #e0e0e0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                {msg.text.split('\n').map((line: string, i: number) => (
                  <div key={i}>{highlightText(line, query)}</div>
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>
        {isTyping && (
          <div className="typing-indicator" style={{ marginLeft: 8, marginTop: 2 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: '#e74c3c', borderRadius: '50%', marginRight: 2, animation: 'typing 1s infinite alternate' }}></span>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: '#e74c3c', borderRadius: '50%', marginRight: 2, animation: 'typing 1s infinite alternate 0.2s' }}></span>
            <span style={{ display: 'inline-block', width: 8, height: 8, background: '#e74c3c', borderRadius: '50%', animation: 'typing 1s infinite alternate 0.4s' }}></span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      {/* Input Row */}
      <form
        onSubmit={handleSend}
        autoComplete="off"
        style={{
          background: '#fff',
          borderTop: '1px solid #eee',
          padding: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, position: 'relative', width: '100%' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a professor's name, department, or school..."
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-label="Chat input"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #e0e0e0',
              background: '#fafbfc',
              color: '#23252b',
              fontSize: 15,
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
          {showSuggestions && searchSuggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '100%',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                zIndex: 10,
                marginTop: 2,
                padding: '8px 0',
              }}
            >
              <div style={{ fontWeight: 600, color: '#e74c3c', fontSize: 13, padding: '0 12px 4px 12px' }}>Suggestions:</div>
              {searchSuggestions.map((suggestion: any, idx: number) => (
                <div
                  key={suggestion.name}
                  style={{
                    padding: '14px 16px',
                    background: selectedSuggestion === idx ? '#ffe5e5' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: 6,
                    margin: '4px 0',
                    transition: 'background 0.15s',
                    fontSize: 15,
                  }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestion(idx)}
                  tabIndex={0}
                  aria-selected={selectedSuggestion === idx}
                >
                  <div style={{ fontWeight: 500 }}>{highlightText(suggestion.name, query)}</div>
                  <div style={{ fontSize: 13, color: '#888' }}>{suggestion.department} - {suggestion.school}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <button
            type="submit"
            style={{
              background: '#C70039',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              flex: 1,
            }}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
        <div style={{ width: '100%', textAlign: 'right', fontSize: 12, color: '#888', marginTop: 2 }}>
          Press <b>Enter</b> to send
        </div>
      </form>
    </div>
  );
};

export default AtharBot; 
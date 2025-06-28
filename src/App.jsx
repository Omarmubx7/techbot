import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import doctors from "./doctors.json";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

const fuse = new Fuse(doctors, {
  keys: ["name", "department", "school"],
  threshold: 0.4,
});

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to AtharBot! 👋\n\n just type the first name of the professor you are looking for" }
  ]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeOption, setActiveOption] = useState(0);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const optionsRef = useRef([]);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const results = fuse.search(query.trim()).slice(0, 5);
      setSearchSuggestions(results.map(r => r.item));
      setShowSuggestions(true);
      setSelectedSuggestion(-1);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    setIsTyping(false);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    const userMsg = { sender: "user", text: query };
    setMessages((msgs) => [...msgs, userMsg]);
    await simulateTyping();
    let found = fuse.search(query.trim()).map(res => res.item);
    found = found.sort((a, b) => {
      const q = query.trim().toLowerCase();
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName === q) return -1;
      if (bName === q) return 1;
      if (aName.startsWith(q)) return -1;
      if (bName.startsWith(q)) return 1;
      return 0;
    });
    setQuery("");
    setSelected(null);
    setActiveOption(0);
    setShowSuggestions(false);
    setSearchSuggestions([]);
    setIsLoading(false);
    if (found.length === 0) {
      setMessages((msgs) => [...msgs, { 
        sender: "bot", 
        text: "I couldn't find any professors matching your search. Try searching by name, department, or school. For example:\n• \"Computer Science\"\n• \"Dr. Mohammad\"\n• \"Cyber Security\"" 
      }]);
    } else {
      setMessages((msgs) => [...msgs, { sender: "bot", doc: found[0] }]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
    setIsLoading(true);
    setMessages((msgs) => [...msgs, { sender: "user", text: suggestion.name }]);
    await simulateTyping();
    setIsLoading(false);
    setMessages((msgs) => [...msgs, { sender: "bot", doc: suggestion }]);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions && searchSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
      } else if (e.key === "Enter" && selectedSuggestion >= 0) {
        e.preventDefault();
        handleSuggestionClick(searchSuggestions[selectedSuggestion]);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    }
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : part
    );
  };

  const renderOfficeHours = (office_hours) => {
    if (!office_hours) return null;
    return (
      <div className="mt-2">
        <h3 className="font-semibold text-blue-200 mb-1">Office Hours:</h3>
        <ul className="text-blue-100 text-sm space-y-1">
          {Object.entries(office_hours).map(([day, hours]) => (
            <li key={day}>
              <span className="font-medium">{day}:</span> {hours}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <div className={`athar-chat-container${darkMode ? " dark" : ""}`}
      aria-label="AtharBot chat interface"
    >
      <div className="athar-header">
        <img src="/athar-logo.png" alt="Athar Bot Logo" className="athar-header-logo" />
        <span className="athar-header-title">AtharBot</span>
        <span className="athar-header-moon" onClick={toggleDarkMode} style={{cursor:'pointer'}} aria-label="Toggle dark mode">{darkMode ? "🌙" : "☀️"}</span>
      </div>
      <div className="athar-chat">
        <AnimatePresence initial={false}>
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <motion.div
              key={idx}
              className="athar-bubble-user"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              aria-label="User message"
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
              aria-label="Bot result"
            >
              <div className="font-bold text-lg mb-2">{msg.doc.name}</div>
              <div className="mb-2"><span className="font-semibold">School:</span> {msg.doc.school}</div>
              <div className="mb-2"><span className="font-semibold">Department:</span> {msg.doc.department}</div>
              <div className="mb-2"><span className="font-semibold">Office:</span> {msg.doc.office || "Not specified"}</div>
              <a
                href={`https://outlook.office.com/mail/deeplink/compose?to=${msg.doc.email}`}
                className="text-blue-200 underline hover:text-blue-400 transition font-semibold mb-3 athar-email-link"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: 'inline-block', textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Send email to ${msg.doc.email}`}
              >
                {msg.doc.email}
              </a>
              {renderOfficeHours(msg.doc.office_hours)}
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
            >
              {msg.text}
            </motion.div>
          )
        )}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            className="athar-bubble-bot"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            aria-label="Bot is typing"
          >
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="athar-input-container">
        <form className="athar-input-row" onSubmit={handleSend} autoComplete="off">
          <div className="athar-input-wrapper">
            <input
              ref={inputRef}
              className="athar-input"
              type="text"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search professors, departments, or ask about office hours..."
              disabled={isLoading}
              aria-label="Search input"
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <motion.div
                className="athar-suggestions"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                aria-label="Suggestions"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.email}
                    className={`athar-suggestion-item ${selectedSuggestion === index ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    tabIndex={0}
                    aria-label={`Suggestion: ${suggestion.name}`}
                  >
                    <div className="suggestion-name">
                      {highlightText(suggestion.name, query)}
                    </div>
                    <div className="suggestion-dept">
                      {highlightText(suggestion.department, query)}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          <button 
            className="athar-send-btn" 
            type="submit"
            disabled={isLoading || !query.trim()}
            aria-label="Send"
          >
            {isLoading ? <span role="img" aria-label="Loading">⏳</span> : <span role="img" aria-label="Send">📤</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

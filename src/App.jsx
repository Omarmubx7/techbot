import React, { useState, useRef } from "react";
import "./App.css";
import doctors from "./doctors.json";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

const fuse = new Fuse(doctors, {
  keys: ["name"],
  threshold: 0.4, // smart fuzzy matching
});

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! You can ask about office hours, professors, days, or departments." }
  ]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeOption, setActiveOption] = useState(0);
  const optionsRef = useRef([]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userMsg = { sender: "user", text: query };
    setMessages((msgs) => [...msgs, userMsg]);
    // Fuzzy search for any part of the name, prioritize exact/startsWith
    let found = fuse.search(query.trim()).map(res => res.item);
    // Prioritize exact, then startsWith, then fuzzy
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
    if (found.length === 0) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Sorry, I could not find any matching professor." }]);
    } else if (found.length === 1) {
      setMessages((msgs) => [...msgs, { sender: "bot", doc: found[0] }]);
    } else {
      setMessages((msgs) => [...msgs, { sender: "bot", options: found }]);
    }
  };

  const handleSelect = (doc) => {
    setSelected(doc);
    setMessages((msgs) => [...msgs, { sender: "bot", doc }]);
  };

  const handleEmailClick = (email) => {
    setEmailTo(email);
    setShowPrompt(true);
  };

  const handlePrompt = (go) => {
    setShowPrompt(false);
    if (go) {
      window.location.href = `mailto:${emailTo}`;
    }
  };

  const renderOfficeHours = (office_hours) => {
    if (!office_hours) return null;
    return (
      <div className="mt-2">
        <h3 className="font-semibold text-blue-200 mb-1">Office Hours:</h3>
        <ul className="text-blue-100 text-sm space-y-1">
          {Object.entries(office_hours).map(([day, hours]) => (
            <li key={day}><span className="font-medium">{day}:</span> {hours}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((d) => !d);

  // Keyboard navigation for options
  const handleOptionKeyDown = (e, options, idx) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveOption((prev) => (prev + 1) % options.length);
      optionsRef.current[(idx + 1) % options.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveOption((prev) => (prev - 1 + options.length) % options.length);
      optionsRef.current[(idx - 1 + options.length) % options.length]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(options[idx]);
    }
  };

  return (
    <div className={`athar-chat-container${darkMode ? " dark" : ""}`}>
      <div className="athar-header">
        <img src="/athar-logo.png" alt="Athar Bot Logo" className="athar-header-logo" />
        <span className="athar-header-title">Atharbot</span>
        <span className="athar-header-moon" onClick={toggleDarkMode} style={{cursor:'pointer'}}>{darkMode ? "🌙" : "☀️"}</span>
      </div>
      <div className="athar-chat">
        <AnimatePresence initial={false}>
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <motion.div
              key={idx}
              className="athar-bubble-user"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.32, type: "spring", bounce: 0.2 }}
            >
              {msg.text}
            </motion.div>
          ) : msg.options ? (
            <motion.div
              key={idx}
              className="athar-multi-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, type: "spring", bounce: 0.18 }}
            >
              <div className="athar-multi-title">Multiple professors found:</div>
              <AnimatePresence>
              {msg.options.map((doc, i) => (
                <motion.button
                  key={doc.email + i}
                  ref={el => optionsRef.current[i] = el}
                  className={`athar-multi-option${activeOption === i ? " active" : ""}`}
                  tabIndex={0}
                  onClick={() => handleSelect(doc)}
                  onKeyDown={e => handleOptionKeyDown(e, msg.options, i)}
                  whileHover={{ scale: 1.03, boxShadow: "0 2px 12px rgba(231,76,60,0.13)" }}
                  whileFocus={{ scale: 1.03, boxShadow: "0 2px 12px rgba(231,76,60,0.13)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.22, type: "spring", bounce: 0.18 }}
                >
                  <span>{doc.name}</span>
                  <span className="athar-multi-dept">({doc.department})</span>
                </motion.button>
              ))}
              </AnimatePresence>
            </motion.div>
          ) : msg.doc ? (
            <motion.div
              key={idx}
              className="athar-bubble-bot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.32, type: "spring", bounce: 0.2 }}
            >
              <div className="font-bold text-lg mb-1">{msg.doc.name}</div>
              <div className="mb-1"><span className="font-semibold">School:</span> {msg.doc.school}</div>
              <div className="mb-1"><span className="font-semibold">Department:</span> {msg.doc.department}</div>
              <div className="mb-1"><span className="font-semibold">Office:</span> {msg.doc.office}</div>
              <button
                className="text-blue-200 underline hover:text-blue-400 transition font-semibold mb-2"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                onClick={() => handleEmailClick(msg.doc.email)}
              >
                {msg.doc.email}
              </button>
              {renderOfficeHours(msg.doc.office_hours)}
            </motion.div>
          ) : (
            <motion.div
              key={idx}
              className="athar-bubble-bot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.32, type: "spring", bounce: 0.2 }}
            >
              {msg.text}
            </motion.div>
          )
        )}
        </AnimatePresence>
      </div>
      <form className="athar-input-row" onSubmit={handleSend} autoComplete="off">
        <input
          className="athar-input"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Ask anything about office hours, professors, days, or departments."
        />
        <button className="athar-send-btn" type="submit">Send</button>
      </form>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg mb-4">Do you want to open Outlook to email this professor?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  onClick={() => handlePrompt(true)}
                >
                  Yes
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-blue-700 rounded-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => handlePrompt(false)}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

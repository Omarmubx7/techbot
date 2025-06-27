import React, { useState } from "react";
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

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userMsg = { sender: "user", text: query };
    setMessages((msgs) => [...msgs, userMsg]);
    // Fuzzy search for any part of the name
    const found = fuse.search(query.trim()).map(res => res.item);
    setQuery("");
    setSelected(null);
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

  return (
    <div className={`athar-chat-container${darkMode ? " dark" : ""}`}>
      <div className="athar-header">
        <img src="/athar-logo.png" alt="Athar Bot Logo" className="athar-header-logo" />
        <span className="athar-header-title">Atharbot</span>
        <span className="athar-header-moon" onClick={toggleDarkMode} style={{cursor:'pointer'}}>{darkMode ? "🌙" : "☀️"}</span>
      </div>
      <div className="athar-chat">
        {messages.map((msg, idx) =>
          msg.sender === "user" ? (
            <div key={idx} className="athar-bubble-user">{msg.text}</div>
          ) : msg.options ? (
            <div key={idx} className="athar-bubble-bot">
              <div>Multiple professors found:</div>
              {msg.options.map((doc, i) => (
                <button
                  key={doc.email + i}
                  onClick={() => handleSelect(doc)}
                  style={{
                    display: "block",
                    background: "#35363a",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 12px",
                    margin: "8px 0",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer"
                  }}
                >
                  {doc.name} <span style={{ color: "#e74c3c", fontSize: 12 }}>({doc.department})</span>
                </button>
              ))}
            </div>
          ) : msg.doc ? (
            <div key={idx} className="athar-bubble-bot">
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
            </div>
          ) : (
            <div key={idx} className="athar-bubble-bot">{msg.text}</div>
          )
        )}
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

import React, { useState } from "react";
import "./App.css";
import doctors from "./doctors.json";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [emailTo, setEmailTo] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelected(null);
    if (value.trim() === "") {
      setMatches([]);
      return;
    }
    const found = doctors.filter((doc) =>
      doc.firstName.toLowerCase() === value.trim().toLowerCase()
    );
    setMatches(found);
  };

  const handleSelect = (doc) => {
    setSelected(doc);
    setMatches([doc]);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-start py-10">
      <img src="/athar-logo.png" alt="Athar Bot Logo" className="w-24 h-24 mb-4 drop-shadow-lg animate-fade-in" />
      <h1 className="text-4xl font-extrabold text-blue-900 mb-2 animate-fade-in">Athar Bot</h1>
      <p className="text-lg text-blue-700 mb-8 animate-fade-in delay-100">Type the first name of the doctor</p>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Enter first name..."
        className="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-6 w-72 text-lg shadow animate-fade-in delay-200"
      />
      {/* Animated list of matches */}
      <AnimatePresence>
      {matches.length > 1 && !selected && (
        <motion.div
          className="w-80 bg-white rounded-xl shadow-lg p-4 space-y-2 animate-fade-in delay-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-blue-800 font-semibold mb-2">Multiple doctors found:</p>
          {matches.map((doc) => (
            <motion.button
              key={doc.id}
              onClick={() => handleSelect(doc)}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-blue-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {doc.firstName} {doc.lastName} <span className="text-xs text-blue-400">({doc.specialty})</span>
            </motion.button>
          ))}
        </motion.div>
      )}
      </AnimatePresence>
      {/* Show doctor data */}
      <AnimatePresence>
      {matches.length === 1 && (selected || matches[0]) && (
        <motion.div
          className="w-80 bg-white rounded-xl shadow-xl p-6 mt-6 animate-fade-in delay-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            {selected ? `${selected.firstName} ${selected.lastName}` : `${matches[0].firstName} ${matches[0].lastName}`}
          </h2>
          <p className="text-blue-700 mb-1">Specialty: {selected ? selected.specialty : matches[0].specialty}</p>
          <p className="text-blue-700 mb-1">Phone: {selected ? selected.phone : matches[0].phone}</p>
          <button
            className="text-blue-600 underline hover:text-blue-800 transition font-semibold"
            onClick={() => handleEmailClick(selected ? selected.email : matches[0].email)}
          >
            {selected ? selected.email : matches[0].email}
          </button>
        </motion.div>
      )}
      </AnimatePresence>
      {/* Outlook prompt modal */}
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
            <p className="text-lg mb-4">Do you want to open Outlook to email this doctor?</p>
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

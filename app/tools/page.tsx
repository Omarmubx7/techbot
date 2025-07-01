'use client';
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const AtharBot = dynamic(() => import('../../components/AtharBot'), { ssr: false });

const tools = [
  {
    name: 'Bot',
    icon: '🤖',
    desc: 'Chat with our helpful assistant.',
    component: <AtharBot />,
  },
  {
    name: 'FAQ',
    icon: '❓',
    desc: 'Find answers to common questions.',
    component: <div className="card p-8 text-center">[FAQ Tool Placeholder]</div>,
  },
  {
    name: 'Calculator',
    icon: '🧮',
    desc: 'Use our handy calculator.',
    component: <div className="card p-8 text-center">[Calculator Tool Placeholder]</div>,
  },
];

const ToolsPage: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-darkbg py-16 px-4">
      <AnimatePresence>
        {selected === null ? (
          <motion.div
            key="tools-list"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            <h1 className="text-5xl font-extrabold text-center mb-12 text-primary dark:text-darktext tracking-tight">Our Tools</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl mx-auto">
              {tools.map((tool, idx) => (
                <motion.button
                  key={tool.name}
                  onClick={() => setSelected(idx)}
                  className="card flex flex-col items-center text-center p-10 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all focus:outline-none"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(37,99,235,0.16)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-5xl mb-4">{tool.icon}</span>
                  <span className="text-2xl font-bold text-primary dark:text-darktext mb-2">{tool.name}</span>
                  <p className="text-text dark:text-darktext text-lg opacity-80">{tool.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tool-detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-2xl mx-auto"
          >
            <button
              onClick={() => setSelected(null)}
              className="mb-8 px-4 py-2 rounded-full bg-primary text-white font-semibold shadow-card hover:bg-primary-dark transition-colors"
            >
              ← Back to Tools
            </button>
            <div className="flex flex-col items-center mb-6">
              <span className="text-5xl mb-2">{tools[selected].icon}</span>
              <h1 className="text-3xl font-bold text-primary dark:text-darktext mb-2">{tools[selected].name}</h1>
              <p className="text-lg text-text dark:text-darktext mb-4">{tools[selected].desc}</p>
            </div>
            <div className="w-full flex justify-center">{tools[selected].component}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolsPage; 
"use client";
import * as React from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const AtharBot = dynamic(() => import('./AtharBot'), { ssr: false });

const AtharBotWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const dragStart = React.useRef<{ x: number; y: number } | null>(null);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-atharbot-widget', handler);
    return () => window.removeEventListener('open-atharbot-widget', handler);
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Mouse/touch handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDesktop) return; // Only draggable on desktop
    setDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - drag.x, y: clientY - drag.y };
    document.body.style.userSelect = 'none';
  };
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragging || !dragStart.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    setDrag({ x: clientX - dragStart.current.x, y: clientY - dragStart.current.y });
  };
  const handleDragEnd = () => {
    setDragging(false);
    dragStart.current = null;
    document.body.style.userSelect = '';
  };
  React.useEffect(() => {
    if (!dragging) return;
    const move = (e: any) => handleDrag(e);
    const up = () => handleDragEnd();
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [dragging]);

  // Calculate style for draggable chat window
  const chatWindowStyle = {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    margin: 24,
    width: 'min(380px, 95vw)',
    height: 'min(600px, 90vh)',
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
    overflow: 'auto',
    maxHeight: '90vh',
    maxWidth: '95vw',
    display: 'flex',
    flexDirection: 'column' as const,
    cursor: dragging ? 'grabbing' : 'default',
    zIndex: 1200,
    transform: isDesktop ? `translate(${drag.x}px, ${drag.y}px)` : undefined,
    transition: dragging ? 'none' : 'box-shadow 0.2s',
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: '#C70039',
            color: 'white',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: 'none',
            fontSize: 28,
            cursor: 'pointer',
          }}
          aria-label="Open AtharBot Chat"
        >
          💬
        </button>
      )}

      {/* Chat Modal with animation */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 0,
              zIndex: 1100,
              background: 'rgba(0,0,0,0.2)',
              width: '100vw',
              height: '100vh',
              left: 0,
              top: 0,
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={chatWindowStyle}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8, gap: 8 }}>
                <button
                  onClick={() => setMinimized(true)}
                  style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#C70039' }}
                  aria-label="Minimize Chat"
                >
                  ▬
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#C70039' }}
                  aria-label="Close Chat"
                >
                  ×
                </button>
              </div>
              <AtharBot onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized bar */}
      {open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1100,
            background: '#C70039',
            color: 'white',
            borderRadius: 16,
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Restore AtharBot Chat"
        >
          💬 Chat
        </button>
      )}
    </>
  );
};

export default AtharBotWidget; 
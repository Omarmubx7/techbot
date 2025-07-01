"use client";
import * as React from 'react';
import dynamic from 'next/dynamic';

const AtharBot = dynamic(() => import('./AtharBot'), { ssr: false });

const AtharBotWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-atharbot-widget', handler);
    return () => window.removeEventListener('open-atharbot-widget', handler);
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
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

      {/* Chat Modal */}
      {open && (
        <div
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
          <div
            style={{
              position: 'absolute',
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
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#C70039' }}
                aria-label="Close Chat"
              >
                ×
              </button>
            </div>
            <AtharBot onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AtharBotWidget; 
import type { Metadata } from 'next'
import './globals.css'
import AtharBotWidget from "../components/AtharBotWidget";
import { ThemeProvider, ThemeContext } from "../components/theme-provider";
import React from 'react';
import ThemeToggleButton from "../components/ThemeToggleButton";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
            <ThemeToggleButton />
          </div>
          <AtharBotWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

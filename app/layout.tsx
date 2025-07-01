import type { Metadata } from 'next'
import './globals.css'
import AtharBotWidget from "../components/AtharBotWidget";
import { ThemeProvider, ThemeContext } from "../components/theme-provider";
import React from 'react';
import ThemeToggleButton from "../components/ThemeToggleButton";

export const metadata: Metadata = {
  title: 'Athar',
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
      <head>
        <link rel="icon" href="/logos/team-athar-logo.png" type="image/png" />
        <title>Athar</title>
      </head>
      <body>
        <ThemeProvider>
          {children}
          <div style={{ position: 'fixed', bottom: 80, right: 24, zIndex: 1200 }}>
            <ThemeToggleButton />
          </div>
          <AtharBotWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

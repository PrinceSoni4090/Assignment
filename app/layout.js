'use client'

import { ClerkProvider, useAuth, SignInButton, useUser } from '@clerk/nextjs'
import { ThemeProvider } from '../components/theme-provider'
import { UserProvider } from './context/UserContext'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { ModeToggle } from './components/mode-toggle'
import './globals.css'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const { isSignedIn, signOut } = useAuth()
  const { user, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isLoaded) return null

  const userIdentifier = user?.emailAddresses[0]?.emailAddress || user?.username || 'User'

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    { href: '/notifications', label: 'Notifications' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
            My Dashboard
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              {isSignedIn && navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ModeToggle />
            {isSignedIn ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, {userIdentifier}
                </span>
                <Button variant="ghost" onClick={() => signOut()} className="hover:bg-primary/10">
                  Sign Out
                </Button>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default">Sign In</Button>
              </SignInButton>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {isSignedIn && navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-sm font-medium hover:text-primary transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col space-y-2">
              <ModeToggle />
              {isSignedIn ? (
                <>
                  <span className="text-sm font-medium">
                    Welcome, {userIdentifier}
                  </span>
                  <Button variant="ghost" onClick={() => signOut()} className="hover:bg-primary/10">
                    Sign Out
                  </Button>
                </>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full">Sign In</Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserProvider>
              <Navbar />
              <main>{children}</main>
            </UserProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
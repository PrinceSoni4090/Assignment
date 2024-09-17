'use client'

import Link from 'next/link'
import { useAuth, SignInButton } from '@clerk/nextjs'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { ArrowRight, BarChart2, UserCircle, Bell } from 'lucide-react'

export default function HomePage() {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-black">
      <main className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl bg-card text-card-foreground shadow-lg">
          <CardContent className="p-8 space-y-8">
            <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans py-4 sm:py-6 md:py-8 lg:py-10 relative z-20 font-bold tracking-tight">
              Welcome to User Dashboard
            </h1>
            {isSignedIn ? (
              <div className="space-y-6">
                <p className="text-xl text-center text-muted-foreground">
                  Your personalized dashboard is ready. Explore your data and manage your account.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FeatureCard icon={BarChart2} title="Analytics" />
                  <FeatureCard icon={UserCircle} title="Profile" />
                  <FeatureCard icon={Bell} title="Notifications" />
                </div>
                <div className="flex justify-center pt-4">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard" className="flex items-center justify-center">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-xl text-center text-muted-foreground">
                  Login to access your personalized dashboard and manage your data efficiently.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FeatureCard icon={BarChart2} title="Real-time Analytics" />
                  <FeatureCard icon={UserCircle} title="User Profiles" />
                  <FeatureCard icon={Bell} title="Smart Notifications" />
                </div>
                <div className="flex justify-center pt-4">
                  <SignInButton mode="modal">
                    <Button size="lg" className="w-full sm:w-auto">
                      Login to Dashboard
                    </Button>
                  </SignInButton>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function FeatureCard({ icon: Icon, title }) {
  return (
    <Card className="flex flex-col items-center justify-center p-4 hover:bg-accent transition-colors">
      <Icon className="h-8 w-8 mb-2 text-primary" />
      <h2 className="text-sm font-semibold text-center">{title}</h2>
    </Card>
  )
}
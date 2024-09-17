'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useUser } from '../../app/context/UserContext'
import { Clock, Activity, Users, Bell, Settings, LogOut } from 'lucide-react'
import { useAuth, RedirectToSignIn } from '@clerk/nextjs'

export default function DashboardPage() {
  const lastLogin = new Date().toLocaleString()
  const activityFeed = [
    { id: 1, action: "Completed a task", time: "2 hours ago" },
    { id: 2, action: "Added a new friend", time: "5 hours ago" },
    { id: 3, action: "Updated profile", time: "1 day ago" },
  ]
  const { users } = useUser()
  const { isLoaded, userId } = useAuth()

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!userId) {
    return <RedirectToSignIn />
  }

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-7xl">
      <header className="rounded-lg shadow-lg p-8 bg-card text-card-foreground">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Last login: {lastLogin}
        </p>
      </header>
      
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Activity className="mr-3 h-6 w-6 text-primary" />
                Activity Feed
              </CardTitle>
              <CardDescription>Your recent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {activityFeed.map((activity) => (
                  <li key={activity.id} className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-sm font-medium">{activity.action}</span>
                    <Badge variant="secondary">{activity.time}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Users className="mr-3 h-6 w-6 text-primary" />
                Users
              </CardTitle>
              <CardDescription>List of active users</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {users.map((user, index) => (
                  <li key={index} className="flex items-center space-x-4 border-b border-border pb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
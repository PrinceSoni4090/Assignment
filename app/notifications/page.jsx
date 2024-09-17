'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Bell, MessageSquare, UserPlus, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'message', content: 'You have a new message from Alice', time: '5 minutes ago' },
    { id: 2, type: 'friend', content: 'Bob sent you a friend request', time: '2 hours ago' },
    { id: 3, type: 'system', content: 'Your account was successfully updated', time: '1 day ago' },
  ])

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />
      case 'friend':
        return <UserPlus className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-yellow-500" />
    }
  }

  const removeNotification = () => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="">
          <CardTitle className="text-2xl flex items-center">
            <Bell className="mr-2 h-6 w-6" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence>
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex items-start space-x-4 bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{notification.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {notification.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss notification</span>
                    </Button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-8"
              >
                No new notifications
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
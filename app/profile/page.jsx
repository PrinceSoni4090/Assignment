'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { useUser } from '../context/UserContext'
import { User, Mail, FileText, Camera } from 'lucide-react'

export default function ProfilePage() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [bio, setBio] = useState('I love coding!')
  const [avatar, setAvatar] = useState('/placeholder.svg?height=128&width=128')
  const { addUser } = useUser()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newUser = { name, email, bio, avatar }
    addUser(newUser)
    console.log('Profile updated:', newUser)
    router.push('/dashboard')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b border-border pb-7 mb-7">
          <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-32 h-32 mb-4 border-4 border-primary">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar-upload" className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full transition-colors duration-200 flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Change Avatar
              </Label>
              <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Bio
                </Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="bg-background" rows={4} />
              </div>
            </div>
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
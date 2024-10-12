'use client'

import MainNav from '@/app/components/main-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Pocketbase from 'pocketbase'
import { useEffect } from 'react'

const pb = new Pocketbase('https://cib.pockethost.io');

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <MainNav />
      <div className="container mx-auto px-4 py-16">
        {/* Optional welcome message */}
        {/* <h1 className="text-3xl font-bold mb-8">Welcome, {session?.user?.name || 'User'}!</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="transition-transform transform hover:scale-105 shadow-lg">
            <CardHeader>
              <CardTitle>Your Internship Applications</CardTitle>
              <CardDescription>Track your internship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/coming-soon')} variant="outline">View Applications</Button>
            </CardContent>
          </Card>

          <Card className="transition-transform transform hover:scale-105 shadow-lg">
            <CardHeader>
              <CardTitle>Campus Collaborations</CardTitle>
              <CardDescription>Explore research projects and startup initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/coming-soon')} variant="outline">View Collaborations</Button>
            </CardContent>
          </Card>

          <Card className="transition-transform transform hover:scale-105 shadow-lg">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with employers and collaborators</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/coming-soon')} variant="outline">View Messages</Button>
            </CardContent>
          </Card>

          <Card className="transition-transform transform hover:scale-105 shadow-lg">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/profile')} variant="outline">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

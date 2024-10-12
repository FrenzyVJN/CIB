'use client'

import MainNav from '@/app/components/main-nav'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { use, useEffect } from 'react'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MainNav />
      {/* <h1 className="text-3xl font-bold mb-8">Welcome, {session?.user?.name || 'User'}!</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Internship Applications</CardTitle>
            <CardDescription>Track your internship applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.open('/coming-soon')}>View Applications</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campus Collaborations</CardTitle>
            <CardDescription>Explore research projects and startup initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.open('/coming-soon')}>View Collaborations</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communicate with employers and collaborators</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.open('/coming-soon')}>View Messages</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information and skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.open('/profile')}>Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
'use client'

import MainNav from '@/app/components/main-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Pocketbase from 'pocketbase'
import { useEffect, useState } from 'react'

const pb = new Pocketbase('http://4.247.129.140');

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const onLoad = async () => {
      try {
      if (!pb.authStore.isValid) {
        window.location.href = "/login";
        return;
      }  
      console.log(id);
      if (pb.authStore.model.id === null) {
        window.location.href = "/login";
      }
      setId(pb.authStore.model.id);
      const authData = await pb.collection('users').authRefresh();
      setUser(pb.authStore.model.id);
      setEmail(pb.authStore.model.email);
      console.log("Logged in as:", authData);
      console.log(pb.authStore.model.verified)
      const response = await pb.collection('users').getOne(user);
      console.log("Profile fetched:", response);          
      setProfile(response);
      }
      catch(err){
          console.log("");
      }
  };
    onLoad();
  }, [user, email]);
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
              <CardTitle>Job Posts</CardTitle>
              <CardDescription>Explore research projects and startup initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/internships')} variant="outline">View Opportunities</Button>
            </CardContent>
          </Card>

          <Card className="transition-transform transform hover:scale-105 shadow-lg">
            <CardHeader>
              <CardTitle>Recruit Talent</CardTitle>
              <CardDescription>Create job opportunities and hire individuals for your startups and research initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.open('/post')} variant="outline">Create Opportunities</Button>
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

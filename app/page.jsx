'use client';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { use, useEffect } from 'react'
import PocketBase from 'pocketbase'
import { useState } from 'react'
const pb = new PocketBase('https://cib.pockethost.io');
export default function Home() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const onLoad = async () => {
      try {
      console.log(pb.authStore.model.id);
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
          // console.log(err);
      }
  };
    onLoad();
  }, [user, email]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-5xl font-bold text-center mb-6">Welcome to CampusInternshipBuddy</h1>
      <p className="text-xl text-center mb-8 max-w-2xl">
        Connect with internship opportunities and campus collaborations to kickstart your career.
      </p>
      {id === "" ? (
      <div className="flex space-x-4">
        <Link href="/register">
          <Button size="lg">Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">Log In</Button>
        </Link>
      </div>
      ) : (
      <div className="flex space-x-4">
        <Link href="/dashboard">
          <Button size="lg">Dashboard</Button>
        </Link>
        <Link href="/profile">
          <Button size="lg" variant="outline">Profile</Button>
        </Link>
      </div>)}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <FeatureCard
          title="Find Internships"
          description="Discover exciting internship opportunities tailored to your skills and interests."
          icon={<InternshipIcon className="w-12 h-12 mb-4" />}
        />
        <FeatureCard
          title="Campus Collaborations"
          description="Engage in research projects and startup initiatives within your campus community."
          icon={<CollaborationIcon className="w-12 h-12 mb-4" />}
        />
        <FeatureCard
          title="Build Your Profile"
          description="Showcase your skills, projects, and achievements to stand out to potential employers."
          icon={<ProfileIcon className="w-12 h-12 mb-4" />}
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function InternshipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function CollaborationIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
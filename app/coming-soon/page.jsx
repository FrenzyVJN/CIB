'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-5xl font-bold text-center mb-6">Coming Soon!</h1>
      <p className="text-xl text-center mb-8 max-w-2xl">
        We're working hard to launch something amazing. Stay tuned for updates!
      </p>
      <div className="flex space-x-4">
        <Link href="/register">
          <Button size="lg">Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">Log In</Button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <FeatureCard
          title="Stay Updated"
          description="Subscribe to our newsletter for the latest news and updates."
          icon={<MailIcon className="w-12 h-12 mb-4" />}
        />
        <FeatureCard
          title="Follow Us"
          description="Connect with us on social media for real-time updates."
          icon={<SocialIcon className="w-12 h-12 mb-4" />}
        />
        <FeatureCard
          title="Get Involved"
          description="Join our community and be part of the journey."
          icon={<CommunityIcon className="w-12 h-12 mb-4" />}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function MailIcon(props) {
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
      <path d="M22 12h-20M2 12l10 8 10-8M2 12l10-8 10 8" />
    </svg>
  );
}

function SocialIcon(props) {
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
      <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22 1a9.2 9.2 0 0 1-2.91 1.09A4.48 4.48 0 0 0 16 0a4.48 4.48 0 0 0-4.48 4.48A12.91 12.91 0 0 1 1.5 0 4.48 4.48 0 0 0 3 5.16A4.48 4.48 0 0 1 1 4.1v.06A4.48 4.48 0 0 0 4.48 9a4.48 4.48 0 0 1-2 0.06A4.48 4.48 0 0 0 5.3 14.3A9 9 0 0 1 0 16.91a12.91 12.91 0 0 0 8.84 3A12.91 12.91 0 0 0 22 11.91a12.91 12.91 0 0 0 1-10.91A4.48 4.48 0 0 0 23 3z" />
    </svg>
  );
}

function CommunityIcon(props) {
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
      <path d="M12 12c2 0 4-2 4-4s-2-4-4-4-4 2-4 4 2 4 4 4zM12 12c-4 0-8 2-8 8v1h16v-1c0-6-4-8-8-8z" />
    </svg>
  );
}
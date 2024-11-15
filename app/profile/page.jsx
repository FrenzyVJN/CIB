'use client';
import { useEffect, useState } from "react";
import NavBar from "@/app/components/main-nav";
import PocketBase from 'pocketbase';
import { Button } from '@/components/ui/button';

const pb = new PocketBase('https://4.247.129.140');

export default function PostsPage() {
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState("");

    useEffect(() => {
        const onLoad = async () => {
            try {
                await pb.collection('users').authRefresh();
                setUser(pb.authStore.model.id);
                const response = await pb.collection('users').getOne(user);
                setProfile(response);
            } catch (err) {
                console.log(err);
            }
        };

        onLoad();
    }, [user]);

    const handleVerify = async () => {
        if (pb.authStore.model.verified) {
            alert("Already verified");
            return;
        }
        try {
            await pb.collection('users').requestVerification(profile.email);
            alert("Verification email sent. Check your spam folder.");
        } catch (err) {
            console.log(err);
            alert("Verification failed");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <NavBar />
            <div className="flex flex-col items-center py-12">
                <h1 className="text-6xl font-bold mb-6">Profile</h1>
                <div className="max-w-5xl w-full px-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-4xl font-semibold text-center mb-4">User Details</h2>
                        <div className="space-y-4">
                            <div className="font-mono text-2xl">Name: <span className="font-normal">{profile.name}</span></div>
                            <div className="font-mono text-2xl">Email: <span className="font-normal">{profile.email}</span></div>
                            <div className="font-mono text-2xl">Roll Number: <span className="font-normal">{profile.roll_number}</span></div>
                            <div className="font-mono text-2xl">Mobile Number: <span className="font-normal">{profile.mobile_number}</span></div>
                            <div className="font-mono text-2xl">LinkedIn: <span className="font-normal">{profile.linkedin}</span></div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Button onClick={handleVerify} size="lg">Verify</Button>
                        </div>
                        <div className="mt-10 text-center">
                            <h3 className="text-4xl font-semibold">Jobs Applied</h3>
                            <div className="font-mono text-2xl mt-2">Coming soon...</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

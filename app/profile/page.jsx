'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/sidebar";

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://cib.pockethost.io');
export default function PostsPage() {
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [rollno, setRollno] = useState("");
    const [name, setName] = useState("");

       useEffect(() => {
        const onLoad = async () => {
            try {
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
    const handleVerify = async () => {
        if(pb.authStore.model.verified){
            alert("Already verified");
            return;
        }
        else{
        console.log("Verifying...");
        try{
            await pb.collection('users').requestVerification(email);
            alert("Verification email sent. Check your spam folder");
        }
        catch(err){
            console.log(err);
            console.log("Verification failed");
        }}
    };
        return (    
        <main>
            <div className="mt-10">
                <div className="font-mono text-6xl flex justify-center">Profile</div>
                <div className="flex flex-row">
                    <div className="ml-12">
                        <NavBar />
                    </div>
                    <div className=" justify-center mx-auto pr-32 mt-12 flex flex-col">
                        <div className="font-mono text-4xl flex justify-center">User Details</div>
                        <div className="flex justify-center">
                            <div className="font-mono text-2xl flex justify-center">Name: {profile.name}</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="font-mono text-2xl flex justify-center">Email: {profile.email}</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="font-mono text-2xl flex justify-center">Roll Number: {profile.roll_number}</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="font-mono text-2xl flex justify-center">Mobile Number: {profile.mobile_number}</div>
                        </div>
                        <div className="flex justify-center">
                            <div className="font-mono text-2xl flex justify-center">LinkedIn: {profile.linkedin}</div>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleVerify} className="flex justify-center border rounded-lg mt-3 px-2 py-1">Verify</button>
                        </div>
                        <div>
                            <div className="font-mono text-4xl flex justify-center mt-10">Jobs Applied</div>
                            <div className="flex justify-center">
                                <div className="font-mono text-2xl flex justify-center">Coming soon...</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

'use client'
import Link from "next/link";
import { useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://cib.pockethost.io');


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in...");
        try{
        const authData = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        console.log("Logged in successfully");
        window.open("/", "_self");
        }
        catch(err){
            console.log(err);
            console.log("Login failed");
        }
    }
    return (
        <main>
            <div className="p-10">
                <div className="font-mono text-6xl flex justify-center">Student Login</div>
                <div className="flex flex-col items-center rounded-lg mx-10 mt-12 p-3">
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3 " type="username" name="username" placeholder="Username/Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Link href="/forgot-password" className="flex w-full justify-center mt-3">Forgot password?</Link>
                    <div>
                        <button className="border rounded-lg px-4 py-2 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-50 hover:bg-white duration-300 mt-4" onClick={handleLogin} type="submit">Login</button>
                    </div>
                </div>
            </div>
        </main>
    );
    }
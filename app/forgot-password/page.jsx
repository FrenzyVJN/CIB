'use client'
import { useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://4.247.129.140');

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        console.log("sending email to reset password ...");
        await pb.collection('users').requestPasswordReset(email);
        console.log("Email sent successfully");
    }
    return (
        <main>
            <div className="p-10">
                <div className="font-mono text-6xl flex justify-center">Student Login</div>
                <form className="flex flex-col items-center rounded-lg mx-10 mt-12 p-3" onSubmit={handleForgotPassword}>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <button className="border rounded-lg px-4 py-2 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-50 hover:bg-white duration-300 mt-4" type="submit">Forgot password?</button>
                    </div>
                </form>
            </div>
        </main>
    );
    }
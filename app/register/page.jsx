'use client'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import app from "../config/firebaseConfig.js";

// const app = initializeApp(firebaseConfig);
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollno, setRollno] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const auth = getAuth(app);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User registered:", user);
            // Optionally, you can add additional user data to Firestore or other databases here
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Registration error:", errorCode, errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <main>
            <div className="p-10">
                <div className="font-mono text-6xl font-semibold flex justify-center">Register</div>
                <form className="flex flex-col items-center rounded-lg mx-10 mt-12 p-3" onSubmit={handleRegister}>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="text" name="rollno" placeholder="Roll number" value={rollno} onChange={(e) => setRollno(e.target.value)} />
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="text" name="mobileno" placeholder="Mobile Number" value={mobileno} onChange={(e) => setMobileno(e.target.value)} />
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-[#4A4A4A] w-1/2 font-mono p-2 rounded-lg mt-3" type="text" name="linkedin" placeholder="LinkedIn Link" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                    </div>
                    <div>
                        <button className="border rounded-lg px-4 py-2 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-opacity-50 hover:bg-white duration-300 mt-4" type="submit">Register</button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </main>
    );
}


'use client';
import { useState } from "react";
import Pocketbase from "pocketbase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const pb = new Pocketbase('https://cib.pockethost.io/');

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollno, setRollno] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [role, setRole] = useState("student"); // Default value for role
    const [error, setError] = useState(null);

    const handleLogin = () => {
        window.open("/login", "_self");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // if (password.length < 8) {
        //     setError("Password must be at least 8 characters long.");
        //     return;
        // }
        // if (mobileno.length !== 10) {
        //     setError("Mobile number must be 10 digits long.");
        //     return;
        // }   
        const data = {
            username,
            email,
            password,
            passwordConfirm: password,
            roll_number: rollno,
            mobile_number: mobileno,
            linkedin,
            name: username,
            role, // Include role in the data
        };

        try {
            document.getElementById("register").disabled = true;
            console.log("Registering...");
            const record = await pb.collection('users').create(data);
            console.log("Registered successfully");
            await pb.collection('users').authWithPassword(email, password);
            console.log("Logged in successfully");
            window.open("/", "_self");
        } catch (err) {
            document.getElementById("register").disabled = false;
            setError(err.message); // Set the error message if registration fails
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center">Register for an account</h3>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="rollno">Roll Number</Label>
                        <Input
                            type="text"
                            placeholder="Roll Number"
                            id="rollno"
                            value={rollno}
                            onChange={(e) => setRollno(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="mobileno">Mobile Number</Label>
                        <Input
                            type="text"
                            placeholder="Mobile Number"
                            id="mobileno"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                            type="url"
                            placeholder="LinkedIn URL"
                            id="linkedin"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="role">Role</Label>
                        <select value={role} onValueChange={setRole} id="role">
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div className="flex items-baseline justify-between mt-6">
                        <Button type="submit" id="register" className="mt-4">Register</Button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span onClick={handleLogin} className="text-blue-500 cursor-pointer">Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

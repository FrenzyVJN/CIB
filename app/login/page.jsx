'use client'
import Link from "next/link";
import { useState } from "react";
import PocketBase from 'pocketbase';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const pb = new PocketBase('https://cib.pockethost.io');


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in...");
        try{
        document.getElementById("login").disabled = true;
        const authData = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        console.log("Logged in successfully");
        window.open("/", "_self");
        }
        catch(err){
          document.getElementById("login").disabled = false;
          console.log(err);
            console.log("Login failed");
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
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
            <div className="flex items-baseline justify-between">
              <Button type="submit" id="login" className="mt-4">Login</Button>
            </div>
            <div className="mt-4 text-center">
              <Link href="/register">
                <div className="text-blue-500">Create an account</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
    }
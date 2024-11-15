'use client';
import Link from "next/link";
import { useState } from "react";
import PocketBase from 'pocketbase';
import NavBar from "../components/main-nav"; // Use main navigation

const pb = new PocketBase('http://4.247.129.140');

export default function RegisterPage() {
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [post_type, setPostType] = useState('');
    const applied_count = 0;

    const handleSubmission = async () => {
        console.log('Posting...');
        const data = {
            type: post_type,
            author,
            description,
            applied_count,
            author_contact: contact
        };
        try {
            const record = await pb.collection('posts').create(data);
            console.log("Record created:", record);
            alert("Post created successfully!");
        } catch (e) {
            const errorMessage = (403 === e.status) 
                ? "You are not authorized to perform this action" 
                : "An error occurred. Please try again later.";
            alert(errorMessage);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <NavBar />
            <div className="py-12">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-10">
                <h1 className="font-mono text-5xl text-center text-gray-800 mb-6">Create a New Post</h1>
                <div className="flex flex-col gap-6">
                    <select 
                        value={post_type} 
                        onChange={(e) => setPostType(e.target.value)} 
                        id="post_type" 
                        className="bg-gray-200 p-3 rounded-lg text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" defaultChecked>Select Type</option>
                        <option value="Research Opportunity">Research Opportunities</option>
                        <option value="Internship">Internship</option>
                        <option value="Others">Others</option>
                    </select>
                    <input 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        id="author" 
                        type="text" 
                        className="bg-gray-200 rounded-lg p-3 h-12 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Author Name"
                    />
                    <input 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        id="description" 
                        type="text" 
                        className="bg-gray-200 rounded-lg p-3 h-12 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Post Description"
                    />
                    <input 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
                        id="contact" 
                        type="text"  
                        className="bg-gray-200 rounded-lg h-12 p-3 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Contact Number/Email"
                    />
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out" 
                        onClick={handleSubmission}
                    >
                        Post
                    </button>
                </div>
            </div>
            </div>
        </main>
    );
}

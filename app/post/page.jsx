'use client'
import Link from "next/link";
import { useState } from "react";
import PocketBase from 'pocketbase';
import NavBar from "../components/navbar";
const pb = new PocketBase('https://cib.pockethost.io');


export default function RegisterPage() {
    let [author, setAuthor] = useState('');
    let [description, setDescription] = useState('');
    let [contact, setContact] = useState('');
    let [post_type, setPostType] = useState('');
    let applied_count = 0;
    const handleSubmission = async () => {
        console.log('Posting...');
        let author_contact = contact;
        let type = post_type;
        let data = {
            type,
            author,
            description,
            applied_count,
            author_contact
        }
        try {
        const record = await pb.collection('posts').create(data);
        console.log("Record created: ", record);
        }
        catch (e) {
            403 === e.status ? alert("You are not authorized to perform this action") : alert("An error occurred. Please try again later.");

        }
    }
    return (
        <main>
            <div className="mt-10">
                <div className="font-mono text-6xl flex justify-center">Create Post</div>
                <div className="ml-10">
                    <NavBar />
                </div>
                <div className="flex flex-col w-fit mx-auto gap-4">
                    {/* <input id="post_id" type="text" /> */}
                    <select value={post_type} onChange={(e) => setPostType(e.target.value)} id="post_type" className="bg-[#4A4A4A] p-2 rounded-lg text-xl">
                        <option value="" defaultChecked>Select Option</option>
                        <option value="Research Opportunity">Research Opportunities</option>
                        <option value="Internship">Internship</option>
                        <option value="Others">Others</option>
                    </select>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} id="author" type="text" className="bg-[#4A4A4A] rounded-lg font-mono p-2 h-8 placeholder:text-gray-400" placeholder="Author"/>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} id="description" type="text" className="bg-[#4A4A4A] rounded-lg font-mono p-2 h-8 placeholder:text-gray-400" placeholder="Description"/>
                    <input value={contact} onChange={(e) => setContact(e.target.value)} id="contact" type="text"  className="bg-[#4A4A4A] rounded-lg font-mono h-8 p-2 placeholder:text-gray-400" placeholder="Contact number/email"/>
                    <button className="rounded-lg w-fit px-2 py-1 mx-auto border" onClick={handleSubmission}>Post</button>
                </div>
            </div>
        </main>
    );
    }
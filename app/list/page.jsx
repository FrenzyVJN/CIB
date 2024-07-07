'use client'
// pages/PostsPage.js
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import NavBar from "../Components/navbar.jsx";

const pb = new PocketBase('https://cib.pockethost.io');

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
 
       useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await pb.collection('posts').getFullList({
                    sort: '-created',
                });
                console.log("Posts fetched:", response);          
                setPosts(response);
            } catch (error) {
                // console.error("Error fetching posts:", error);
            }
        }
        const onLoad = async () => {
            try {
            const authData = await pb.collection('users').authRefresh();
            console.log("Logged in as:", authData);
            console.log(pb.authStore.model.verified)
            }
            catch(err){
                console.log("");
            }
        };
        fetchPosts();
        onLoad();

    }, []);
    const handleApply = async (postId, count, candidates) => {
        // Check if the user is verified
        if (pb.authStore.model.verified) {
            // Initialize candidates object if it's not provided or undefined
            candidates = candidates || {};
    
            // Check if the user has already applied
            for (let key in candidates) {
                if (candidates[key] === pb.authStore.model.email) {
                    console.log("You have already applied for this job");
                    return;
                }
            }
    
            // Proceed with applying for the job
            console.log("Applying for post with ID:", postId);
            let cnt = count.toString();
            candidates[cnt] = pb.authStore.model.email;
    
            // Prepare data for update
            const data = {
                "applied_count": count + 1,
                "applied_candidates": candidates
            };
            console.log("Updated data:", data);
    
            // Update the post document in the 'posts' collection
            try {
                const record = await pb.collection('posts').update(postId, data);
                console.log("Application successful:", record);
            } catch (error) {
                console.error("Failed to update post:", error);
                // Handle error as needed
            }
    
        } else {
            console.log("Please verify your account to apply for the job");
        }
    };
        return (
        <main>
            <div className="mt-10">
                <div className="font-mono text-6xl flex justify-center">Posted Jobs</div>
                <div className="ml-10">
                    <NavBar />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-gray-700 p-4 rounded-lg w-80">
                            <h3 className="text-xl font-semibold text-gray-400">{post.type}</h3>
                            <p className="text-gray-300 mt-5">{post.description}</p>
                            <p className="mt-2 text-gray-300">Contact: {post.author_contact}</p>
                            <p className="mt-2 text-gray-300">Author: {post.author}</p>
                            <p className="mt-2 text-gray-300">Applied: {post.applied_count}</p>
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleApply(post.id, post.applied_count, post.applied_candidates)}
                            >
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

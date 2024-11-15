'use client';
import { useEffect, useState } from "react";
import NavBar from "../components/main-nav"; // Update this path if needed
import PocketBase from 'pocketbase';
import { Button } from '@/components/ui/button';

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
                console.error("Error fetching posts:", error);
            }
        }

        const onLoad = async () => {
            try {
                await pb.collection('users').authRefresh();
            } catch (err) {
                console.log(err);
            }
        };

        fetchPosts();
        onLoad();
    }, []);

    const handleApply = async (postId, count, candidates) => {
        try{
        if (pb.authStore.model.verified) {
            candidates = candidates || {};
    
            // Check if the user has already applied
            if (Object.values(candidates).includes(pb.authStore.model.email)) {
                alert("You have already applied for this job");
                return;
            }

            let newCount = count + 1;
            candidates[newCount.toString()] = pb.authStore.model.email;

            const data = {
                "applied_count": newCount,
                "applied_candidates": candidates
            };

            try {
                const record = await pb.collection('posts').update(postId, data);
                console.log("Application successful:", record);
                alert("Application successful");
            } catch (error) {
                console.error("Failed to update post:", error);
            }
        } else {
            alert("Please verify your account to apply for the job");
        }}
        catch(err){
            alert("Please Login to apply");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <NavBar />
            <div className="flex flex-col items-center py-12">
                <h1 className="text-6xl font-bold mb-8">Posted Jobs</h1>
                <div className="max-w-5xl w-full px-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        {posts.map(post => (
                            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md w-80">
                                <h3 className="text-xl font-semibold text-gray-800">{post.type}</h3>
                                <p className="text-gray-600 mt-3">{post.description}</p>
                                <p className="mt-2 text-gray-600">Contact: {post.author_contact}</p>
                                <p className="mt-2 text-gray-600">Author: {post.author}</p>
                                <p className="mt-2 text-gray-600">Applied: {post.applied_count}</p>
                                <Button
                                    className="mt-4 w-full"
                                    onClick={() => handleApply(post.id, post.applied_count, post.applied_candidates)}
                                >
                                    Apply
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

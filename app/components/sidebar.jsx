'use client'
import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react';
import Link from "next/link";

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://cib.pockethost.io');
export default function NavBar (){

  useEffect(() => {
    const onLoad = async () => {
        try {
        const authData = await pb.collection('users').authRefresh();
        console.log("Logged in as:", authData);
        console.log(pb.authStore.model.verified)
        }
        catch(err){
            console.log("Not Logged in");
            console.log(pb.authStore.isValid)
        }
        let stat = pb.authStore.isValid;
        if (stat === false) {
            window.open("/register", "_self");
        }
    };
    onLoad();
}, []);
  const [isOpen, setIsOpen] = useState(false)

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}
  return (
    <div className="bg-black">
      <div className="w-fit h-fit">
    {/* <motion.div className="h-40 w-40 bg-white"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    /> */}
  <button className="bg-inherit w-10 h-10" onClick={() => setIsOpen(isOpen => !isOpen)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </button>
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      {/* <button className="bg-white w-10 h-10" onClick={() => setIsOpen(isOpen => !isOpen)} /> */}
      <div className="flex flex-col">
        <Link href='/' className="text-white text-2xl">
          Home
        </Link>
        <Link href="/list" className="text-white text-2xl">
          Jobs
        </Link>
        <Link href="post" className="text-white text-2xl">
          Post Job
        </Link>
        <div className="text-white text-2xl">
          Contact
        </div>
        
      </div>
    </motion.nav>
  </div>
    </div>
  );
};

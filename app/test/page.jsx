'use client'
import { motion } from "framer-motion"
import React, { useState } from 'react';

export default function TestPage (){
  const [isOpen, setIsOpen] = useState(true)

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}
  return (
    <div className="bg-black min-h-screen">
      <div className="h-40 w-40">
    {/* <motion.div className="h-40 w-40 bg-white"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    /> */}
  <button className="bg-white w-10 h-10" onClick={() => setIsOpen(isOpen => !isOpen)} />
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      {/* <button className="bg-white w-10 h-10" onClick={() => setIsOpen(isOpen => !isOpen)} /> */}
      <div className="bg-white">
        hello world
      </div>
    </motion.nav>
  </div>
    </div>
  );
};

import Image from "next/image";
import NavBar from "./Components/NavBar";
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://cib.pockethost.io');



export default function Home() {
  return (
    <main className="flex min-h-screen flex-row p-4 md:pt-24">
      <NavBar />
      <div className="md:p-24">
        {/* <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"> */}
        {/* </div> */}
        <div className="md:text-6xl text-2xl">
        CIB
        </div>
        <div className="md:text-2xl text-sm">
          Campus Internship Buddy
        </div>
        <div className="text-[10px] md:text-lg">
          Begin your internship journey with CIB - Your Campus Internship Buddy!
        </div>
        <button className="border py-1 px-2 rounded-lg mt-10 disabled:bg-white disabled:bg-opacity-40" disabled>Coming Soon...</button>
      </div>
    </main>
  );
}

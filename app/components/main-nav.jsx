import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Pocketbase from 'pocketbase';

const pb = new Pocketbase('https://cib.pockethost.io');

export default function MainNav() {
  
  const LogOut = async () => {
    try {
      pb.authStore.clear();
      console.log("Logged out");
      alert("Logged out successfully!");
    } catch (e) {
      console.error("An error occurred:", e);
      alert("An error occurred. Please try again later.");
    }
  }
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-black">CampusInternshipBuddy</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/internships">Internships</NavLink>
              <NavLink href="/dashboard">Dashboard</NavLink>
              {/* <NavLink href="/coming-soon">Collaborations</NavLink>
              <NavLink href="/coming-soon">Messages</NavLink> */}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button onClick={LogOut} variant="ghost">Log out</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
    >
      {children}
    </Link>
  );
}

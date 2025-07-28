// components/MobileMenu.tsx (Client Component)
'use client';

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const MobileMenu = ({ session }: { session: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <FiX className="block h-6 w-6" />
          ) : (
            <FiMenu className="block h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          {session?.user ? (
            <div className="flex flex-col space-y-4 p-4">
              <div className="text-gray-300 font-medium">
                <span>Welcome, </span>
                <span className="text-blue-300">{session.user.username}</span>
              </div>

              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md active:scale-95 transition-transform"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="px-3 py-2 active:scale-95 transition-transform">
              <Link
                href="/sign-up"
                className="block w-full px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-center shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
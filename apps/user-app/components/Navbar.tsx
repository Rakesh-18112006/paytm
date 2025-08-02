"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="fixed w-full z-50 bg-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="hover:scale-105 transition-transform">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Paytm-Hi
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!loading && session?.user ? (
              <div className="flex items-center space-x-6">
                <div className="text-gray-300 hover:text-white transition-colors">
                  <span className="font-medium">
                    Welcome,{" "}
                    <span className="text-blue-300">
                      { session.user.username }
                    </span>
                  </span>
                </div>

                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              !loading && (
                <div className="hover:scale-105 transition-transform">
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>

          <MobileMenu session={session} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

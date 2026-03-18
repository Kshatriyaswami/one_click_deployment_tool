"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Rocket } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'FAQ', path: '/faq' },
    { name: 'How to Use', path: '/how-to-use' },
  ];

  return (
    <nav className="sticky top-4 z-50 mb-10 w-full max-w-5xl mx-auto px-6 py-4 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600/20 p-2 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/30">
            <Rocket size={20} className="text-blue-400 group-hover:text-blue-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            One-Click
          </span>
        </Link>

        {/* Links Section */}
        <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive ? 'text-white bg-white/10 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[5px] h-[2px] bg-blue-500 rounded-full blur-[1px]"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Admin Section */}
        <div>
          <Link href="/admin/login" className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transform hover:-translate-y-0.5 border border-blue-400/20">
            <Shield size={16} className="group-hover:animate-pulse" /> 
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

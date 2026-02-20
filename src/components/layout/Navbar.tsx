'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] p-4 md:p-6 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center clip-path-polygon">
            <span className="text-black font-black text-xl italic">A</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">
            Aerovit
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className="hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-2xl font-bold uppercase tracking-wider text-white hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

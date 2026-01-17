'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { FoursquareLogo } from '../ui/logo';
import { mainNav, type NavItem } from '@/lib/navigation';

export function SpectacularNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownHover = (itemTitle: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(itemTitle);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled 
        ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/10 py-3 lg:py-4' 
        : 'bg-transparent py-4 lg:py-6'
      }
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[60px] lg:min-h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 z-10">
            <div className="transform group-hover:scale-105 transition-all duration-300">
              <FoursquareLogo size="md" showText={false} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              {mainNav.map((item) => (
                <div 
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.items) {
                      handleDropdownHover(item.title);
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                  onMouseLeave={() => item.items && handleDropdownLeave()}
                >
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors duration-300 font-medium group py-2 px-2 whitespace-nowrap"
                  >
                    <span className="text-sm xl:text-base">{item.title}</span>
                    {item.items && (
                      <ChevronDown 
                        className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>

                  {/* Dropdown Menu */}
                  {item.items && activeDropdown === item.title && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl py-2 z-50"
                      onMouseEnter={() => handleDropdownHover(item.title)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.items.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.title}
                          href={dropdownItem.href || '#'}
                          className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl group"
                        >
                          <div className="font-medium text-sm xl:text-base">{dropdownItem.title}</div>
                          {dropdownItem.description && (
                            <div className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 leading-tight">
                              {dropdownItem.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:border-white/40 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
              }`}></span>
              <span className={`absolute block w-full h-0.5 bg-current top-2.5 transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 mx-2 sm:mx-0">
            <div className="p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                {mainNav.map((item) => (
                  <div key={item.title} className="w-full">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href || '#'}
                        className="flex-1 text-slate-300 hover:text-white font-medium transition-colors py-3 px-2 border-b border-slate-700/50 hover:border-slate-600"
                        onClick={() => !item.items && setMobileMenuOpen(false)}
                      >
                        <span className="text-base">{item.title}</span>
                      </Link>
                      {item.items && (
                        <button
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === item.title ? null : item.title);
                          }}
                          aria-label={`Toggle ${item.title} menu`}
                        >
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.title ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Dropdown */}
                    {item.items && activeDropdown === item.title && (
                      <div className="mt-2 ml-2 pl-4 border-l-2 border-emerald-500/30 space-y-2">
                        {item.items.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.title}
                            href={dropdownItem.href || '#'}
                            className="block text-slate-400 hover:text-white py-2 px-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="font-medium text-sm">{dropdownItem.title}</div>
                            {dropdownItem.description && (
                              <div className="text-xs text-slate-500 mt-1 leading-tight">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50 space-y-3">
                <Link
                  href="/auth/login"
                  className="block w-full rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white/90 hover:text-white hover:border-white/40 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block w-full rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
              
              {/* Mobile menu footer with quick contact */}
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-2">Need help?</p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

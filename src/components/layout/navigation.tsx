'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SpectacularButton } from '../ui/spectacular';
import { FoursquareLogo } from '../ui/logo';

export function SpectacularNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'About', 
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about' },
        { name: 'Leadership Board', href: '/board' },
        { name: 'Our Facilities', href: '/facilities' },
      ]
    },
    { 
      name: 'Ministries', 
      href: '/ministry',
      dropdown: [
        { name: 'Ministry Platform', href: '/ministry' },
        { name: 'Worship Experience', href: '/worship' },
        { name: 'Live Stream', href: '/streaming' },
      ]
    },
    { 
      name: 'Connect', 
      href: '/events',
      dropdown: [
        { name: 'Events', href: '/events' },
        { name: 'Blog', href: '/blog' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    { name: 'Give', href: '/giving' },
  ];

  const handleDropdownHover = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled 
        ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/10 py-4' 
        : 'bg-transparent py-6'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="transform group-hover:scale-105 transition-all duration-300">
              <FoursquareLogo size="md" showText={true} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleDropdownHover(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors duration-300 font-medium group py-2"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-foursquare-blue-500 to-foursquare-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl py-2 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/auth/login">
              <SpectacularButton 
                variant="outline" 
                size="sm"
              >
                Login
              </SpectacularButton>
            </Link>
            <Link href="/auth/register">
              <SpectacularButton 
                variant="primary" 
                size="sm"
              >
                Join Us
              </SpectacularButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <div className="lg:hidden mt-4 p-6 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-dramatic animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-slate-300 hover:text-white font-medium transition-colors py-2 border-b border-slate-700"
                    onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.name ? null : item.name);
                        }}
                      />
                    )}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block text-slate-400 hover:text-white text-sm py-2 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3 border-t border-slate-700">
                <Link href="/auth/login" className="block">
                  <SpectacularButton 
                    variant="outline" 
                    size="md" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </SpectacularButton>
                </Link>
                <Link href="/auth/register" className="block">
                  <SpectacularButton 
                    variant="primary" 
                    size="md" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Us
                  </SpectacularButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

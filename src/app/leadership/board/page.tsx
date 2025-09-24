'use client';

import Link from 'next/link';
import { ArrowLeft, Crown } from 'lucide-react';
import { boardMembers } from '@/data/board';
import { BoardMemberImage } from '@/components/board/BoardMemberImage';

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px, 30px 30px'
            }}></div>
          </div>
          
          {/* Floating Gradient Orbs */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 right-20 w-60 h-60 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-8">
          <Link 
            href="/leadership" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leadership
          </Link>
          
          <div className="text-center">
            {/* Title with Gradient Text */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent leading-tight">
              Board of Directors
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-4 leading-relaxed">
              Meet our dedicated leadership team committed to serving our church community with wisdom and faith.
            </p>
            
            {/* Additional Tagline */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
              <Crown className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-blue-100 font-medium">Spiritual Leadership • Biblical Guidance • Community Service</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,60 Q300,120 600,60 T1200,60 L1200,120 L0,120 Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Board Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {boardMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 text-center group"
              >
                {/* Member Photo */}
                <div className="relative mb-3">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <BoardMemberImage
                      src={member.imageUrl}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-top"
                      name={member.name}
                      title={member.title}
                      variant="coordinator"
                    />
                  </div>
                  
                  {/* Leadership Badge for Chairman/Vice Chairman */}
                  {(member.isChairperson || member.isViceChairperson) && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {member.title}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
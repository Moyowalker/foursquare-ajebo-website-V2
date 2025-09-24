'use client';

import Link from 'next/link';
import { ArrowLeft, Crown } from 'lucide-react';
import { boardMembers } from '@/data/board';
import { BoardMemberImage } from '@/components/board/BoardMemberImage';

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/leadership" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Leadership
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Board of Directors
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Meet our dedicated leadership team committed to serving our church community with wisdom and faith.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Board Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {boardMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center group"
              >
                {/* Member Photo */}
                <div className="relative mb-4">
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
                <div className="space-y-2">
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
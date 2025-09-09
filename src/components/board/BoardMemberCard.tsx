'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BoardMember } from '@/types/board';

interface BoardMemberCardProps {
  member: BoardMember;
  index: number;
}

export const BoardMemberCard: React.FC<BoardMemberCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/10"
    >
      {/* Leadership Badge */}
      {(member.isChairperson || member.isViceChairperson) && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {member.isChairperson ? 'Chairman' : 'Vice Chairman'}
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section - Simplified */}
      <div className="p-6 text-center">
        {/* Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {member.name}
        </h3>
        
        {/* Position */}
        <p className="text-purple-400 font-semibold text-lg">
          {member.position}
        </p>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/30 rounded-2xl transition-all duration-300" />
    </motion.div>
  );
};

export default BoardMemberCard;

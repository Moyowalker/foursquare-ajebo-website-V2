'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Target } from 'lucide-react';
import Link from 'next/link';
import { boardPageData } from '@/data/board';
import BoardMemberCard from '@/components/board/BoardMemberCard';
import { GradientText, GlassCard, SpectacularButton } from '@/components/ui/spectacular';
import { FoursquareLogo } from '@/components/ui/logo';

function BoardMembersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-32">
      {/* Page already has SpectacularNavigation from layout.tsx */}
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200 font-medium">Board Members</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                <GradientText>{boardPageData.hero.title}</GradientText>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-purple-300 font-semibold mb-6">
                {boardPageData.hero.subtitle}
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {boardPageData.hero.description}
              </p>
            </motion.div>

            {/* Biblical Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12"
            >
              <GlassCard intensity="medium" className="p-8 text-center max-w-3xl mx-auto">
                <div className="text-2xl text-gray-300 italic mb-4">
                  "Let the elders who rule well be considered worthy of double honor, especially those who labor in preaching and teaching."
                </div>
                <div className="text-purple-300 font-semibold">
                  1 Timothy 5:17
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Sections */}
      {boardPageData.sections.map((section, sectionIndex) => (
        <section key={section.title} className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                <GradientText gradient="secondary">{section.title}</GradientText>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {section.description}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mt-6"></div>
            </motion.div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {section.members.map((member, memberIndex) => (
                <BoardMemberCard
                  key={member.id}
                  member={member}
                  index={memberIndex}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mission Statement */}
      <section className="py-20 bg-slate-900 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-8">
              <Target className="w-8 h-8 text-indigo-300" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <GradientText>Our Commitment</GradientText>
            </h2>
            
            <p className="text-xl lg:text-2xl leading-relaxed mb-8">
              "Together, we are committed to serving God faithfully, leading with integrity, 
              and building a community where every member can grow in faith and purpose. 
              Our diverse skills and unified vision drive us to advance God's kingdom 
              through Foursquare Gospel Church Ajebo."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <GlassCard intensity="light" className="p-6">
                <h3 className="text-2xl font-bold mb-2">Spiritual Leadership</h3>
                <p className="text-gray-300">Guiding with biblical wisdom and prayer</p>
              </GlassCard>
              
              <GlassCard intensity="light" className="p-6">
                <h3 className="text-2xl font-bold mb-2">Strategic Vision</h3>
                <p className="text-gray-300">Planning for sustainable church growth</p>
              </GlassCard>
              
              <GlassCard intensity="light" className="p-6">
                <h3 className="text-2xl font-bold mb-2">Community Impact</h3>
                <p className="text-gray-300">Transforming lives and communities</p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BoardMembersPage;

'use client';

import React from 'react';
import { SpectacularButton, GlassCard, GradientText } from '@/components/ui/spectacular';
import { Play, Users, MessageCircle, Heart, Settings, Camera } from 'lucide-react';

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-32">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-medium">LIVE NOW</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              <GradientText>Live Church Service</GradientText>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Join us for our Sunday worship service streaming live from Foursquare Camp Ajebo Church. 
              Experience powerful worship, inspiring sermons, and connect with our community online.
            </p>
          </div>

          {/* Video Player Section */}
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 mb-8">
              <div className="aspect-video bg-black rounded-lg relative overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Live Stream Starting Soon</h3>
                    <p className="text-slate-400">Sunday Service at 10:00 AM WAT</p>
                  </div>
                </div>
                
                {/* Live Overlay */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>

                {/* Viewer Count */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>247 viewers</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Stream Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">Sunday Worship Service</h2>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Live</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <SpectacularButton variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat (42)
                  </SpectacularButton>
                  
                  <SpectacularButton variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Prayer (8)
                  </SpectacularButton>
                  
                  <SpectacularButton variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </SpectacularButton>
                </div>
              </div>
            </GlassCard>

            {/* Service Information */}
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">Today's Message</h3>
                <p className="text-slate-300 mb-4">"Walking in Faith: Trusting God's Plan"</p>
                <div className="text-sm text-slate-400">
                  <p>Pastor Emmanuel Adebayo</p>
                  <p>Hebrews 11:1-6</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">Service Time</h3>
                <p className="text-slate-300 mb-2">Sunday Worship</p>
                <p className="text-slate-400 text-sm mb-4">10:00 AM - 12:00 PM WAT</p>
                <div className="text-sm text-slate-400">
                  <p>Location: Foursquare Camp Ajebo</p>
                  <p>Ogun State, Nigeria</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">Connect With Us</h3>
                <p className="text-slate-300 mb-4">Join our community online and stay connected</p>
                <div className="space-y-2">
                  <SpectacularButton variant="primary" size="sm" className="w-full">
                    Join Prayer Room
                  </SpectacularButton>
                  <SpectacularButton variant="outline" size="sm" className="w-full">
                    Download Sermon Notes
                  </SpectacularButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              <GradientText>Experience More</GradientText>
            </h2>
            <p className="text-slate-300 mb-8">
              Our live streaming platform offers interactive features to enhance your worship experience
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Live Chat</h3>
                <p className="text-sm text-slate-400">Connect with other viewers during the service</p>
              </div>
              
              <div className="text-center">
                <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Prayer Requests</h3>
                <p className="text-sm text-slate-400">Submit prayer requests for our community</p>
              </div>
              
              <div className="text-center">
                <Camera className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Multi-Camera</h3>
                <p className="text-sm text-slate-400">Choose from different camera angles</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { mockUsers } from '@/data/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function MemberDirectoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ministryFilter, setMinstryFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load members who have opted to show in directory
      const visibleMembers = mockUsers.filter(member => 
        member.preferences?.privacy?.showInDirectory && 
        member.id !== parsedUser.id // Don't show current user
      );
      setMembers(visibleMembers);
      setFilteredMembers(visibleMembers);
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    // Filter members based on search and filters
    let filtered = members;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member => 
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.ministries?.some(ministry => ministry.toLowerCase().includes(term))
      );
    }

    if (ministryFilter) {
      filtered = filtered.filter(member =>
        member.ministries?.includes(ministryFilter)
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(member => {
        const roleType = typeof member.role === 'string' ? member.role : (member.role as any).type;
        return roleType === roleFilter;
      });
    }

    setFilteredMembers(filtered);
  }, [searchTerm, ministryFilter, roleFilter, members]);

  const getAllMinistries = () => {
    const ministries = new Set<string>();
    members.forEach(member => {
      member.ministries?.forEach(ministry => ministries.add(ministry));
    });
    return Array.from(ministries).sort();
  };

  const getRoleDisplayName = (role: any) => {
    const roleType = typeof role === 'string' ? role : role.type;
    const roleNames = {
      member: 'Member',
      leader: 'Leader',
      pastor: 'Pastor',
      admin: 'Admin'
    };
    return roleNames[roleType as keyof typeof roleNames] || 'Member';
  };

  const canViewContactInfo = (member: User) => {
    return member.preferences?.privacy?.shareContactInfo || false;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/member/dashboard" className="text-blue-400 hover:text-blue-300">
                ← Back to Dashboard
              </Link>
              <span className="text-slate-400">•</span>
              <span className="text-white font-medium">Member Directory</span>
            </div>
            
            <Link href="/member/profile">
              <SpectacularButton variant="outline" size="sm">
                Edit My Profile
              </SpectacularButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Member Directory</h1>
          <p className="text-slate-300">
            Connect with your church family and ministry teams
          </p>
        </div>

        {/* Search and Filters */}
        <SpectacularCard className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Search Members</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                placeholder="Search by name, email, or ministry..."
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Ministry</label>
              <select
                value={ministryFilter}
                onChange={(e) => setMinstryFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Ministries</option>
                {getAllMinistries().map((ministry) => (
                  <option key={ministry} value={ministry}>
                    {ministry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Roles</option>
                <option value="member">Members</option>
                <option value="leader">Leaders</option>
                <option value="pastor">Pastors</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            <div className="flex items-end">
              <SpectacularButton
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setMinstryFilter('');
                  setRoleFilter('');
                }}
                className="w-full"
              >
                Clear Filters
              </SpectacularButton>
            </div>
          </div>
        </SpectacularCard>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-slate-300">
            Showing {filteredMembers.length} of {members.length} members
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <SpectacularCard className="p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Members Found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || ministryFilter || roleFilter
                ? "Try adjusting your search criteria or filters."
                : "No members have opted to be shown in the directory yet."}
            </p>
            <SpectacularButton
              onClick={() => {
                setSearchTerm('');
                setMinstryFilter('');
                setRoleFilter('');
              }}
            >
              Clear Filters
            </SpectacularButton>
          </SpectacularCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <SpectacularCard key={member.id} className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {member.firstName} {member.lastName}
                  </h3>
                  <SpectacularBadge variant="info" size="sm">
                    {getRoleDisplayName(member.role)}
                  </SpectacularBadge>
                </div>

                {/* Contact Information */}
                {canViewContactInfo(member) ? (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500">📧</span>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {member.email}
                      </a>
                    </div>
                    {member.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500">📱</span>
                        <a 
                          href={`tel:${member.phone}`}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-slate-500 text-sm mb-4">
                    Contact info private
                  </div>
                )}

                {/* Ministries */}
                {member.ministries && member.ministries.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Ministries:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.ministries.map((ministry, index) => (
                        <SpectacularBadge key={index} variant="success" size="sm">
                          {ministry}
                        </SpectacularBadge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Member Since */}
                <div className="text-center text-slate-500 text-xs pt-3 border-t border-slate-200">
                  Member since {new Date(member.membershipDate).toLocaleDateString()}
                </div>

                {/* Contact Actions */}
                {canViewContactInfo(member) && (
                  <div className="flex space-x-2 mt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1"
                    >
                      <SpectacularButton variant="outline" size="sm" className="w-full">
                        Email
                      </SpectacularButton>
                    </a>
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex-1"
                      >
                        <SpectacularButton variant="outline" size="sm" className="w-full">
                          Call
                        </SpectacularButton>
                      </a>
                    )}
                  </div>
                )}
              </SpectacularCard>
            ))}
          </div>
        )}

        {/* Privacy Notice */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🔒 Privacy & Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Who Appears Here:</h4>
              <ul className="space-y-1">
                <li>• Members who opted to show in directory</li>
                <li>• Active church members only</li>
                <li>• Contact info depends on privacy settings</li>
                <li>• Leadership contact info may be limited</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Privacy Controls:</h4>
              <ul className="space-y-1">
                <li>• Update your visibility in profile settings</li>
                <li>• Choose what contact info to share</li>
                <li>• Ministry involvement is always visible</li>
                <li>• Report any misuse to church leadership</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <Link href="/member/profile">
              <SpectacularButton variant="outline" size="sm">
                Update My Privacy Settings
              </SpectacularButton>
            </Link>
          </div>
        </SpectacularCard>

        {/* Leadership Contact */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📞 Church Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">👨‍💼</div>
              <h4 className="font-semibold text-slate-800">Senior Pastor</h4>
              <p className="text-slate-600 text-sm">For spiritual guidance and counseling</p>
              <div className="mt-2">
                <a href="mailto:pastor@foursquareajebo.org" className="text-blue-600 hover:text-blue-700 text-sm">
                  pastor@foursquareajebo.org
                </a>
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-semibold text-slate-800">Church Admin</h4>
              <p className="text-slate-600 text-sm">For membership and general inquiries</p>
              <div className="mt-2">
                <a href="mailto:admin@foursquareajebo.org" className="text-blue-600 hover:text-blue-700 text-sm">
                  admin@foursquareajebo.org
                </a>
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🙏</div>
              <h4 className="font-semibold text-slate-800">Prayer Team</h4>
              <p className="text-slate-600 text-sm">For prayer requests and spiritual support</p>
              <div className="mt-2">
                <a href="mailto:prayer@foursquareajebo.org" className="text-blue-600 hover:text-blue-700 text-sm">
                  prayer@foursquareajebo.org
                </a>
              </div>
            </div>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}

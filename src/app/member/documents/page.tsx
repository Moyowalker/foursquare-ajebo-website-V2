'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

interface Document {
  id: string;
  title: string;
  description: string;
  category: 'bylaws' | 'forms' | 'sermons' | 'bulletins' | 'announcements' | 'financial' | 'ministry';
  fileType: 'pdf' | 'doc' | 'docx' | 'mp3' | 'video';
  fileSize: string;
  uploadDate: string;
  accessLevel: 'public' | 'member' | 'leader' | 'admin';
  tags?: string[];
  downloadCount: number;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Church Constitution and Bylaws',
    description: 'Official governing documents of Foursquare Gospel Church Ajebo',
    category: 'bylaws',
    fileType: 'pdf',
    fileSize: '2.3 MB',
    uploadDate: '2024-01-15',
    accessLevel: 'member',
    tags: ['governance', 'constitution'],
    downloadCount: 45
  },
  {
    id: '2',
    title: 'New Member Registration Form',
    description: 'Complete form for new member registration and information',
    category: 'forms',
    fileType: 'pdf',
    fileSize: '856 KB',
    uploadDate: '2024-02-01',
    accessLevel: 'public',
    tags: ['membership', 'registration'],
    downloadCount: 78
  },
  {
    id: '3',
    title: 'Sunday Service Bulletin - December 22, 2024',
    description: 'Order of service, announcements, and prayer requests',
    category: 'bulletins',
    fileType: 'pdf',
    fileSize: '1.2 MB',
    uploadDate: '2024-12-22',
    accessLevel: 'member',
    tags: ['bulletin', 'service'],
    downloadCount: 32
  },
  {
    id: '4',
    title: 'Faith and Healing - Pastor\'s Teaching Series',
    description: 'Complete audio series on faith and divine healing (5 parts)',
    category: 'sermons',
    fileType: 'mp3',
    fileSize: '145 MB',
    uploadDate: '2024-11-15',
    accessLevel: 'member',
    tags: ['teaching', 'faith', 'healing'],
    downloadCount: 67
  },
  {
    id: '5',
    title: 'Ministry Leader Application',
    description: 'Application form for ministry leadership positions',
    category: 'forms',
    fileType: 'pdf',
    fileSize: '1.5 MB',
    uploadDate: '2024-10-30',
    accessLevel: 'member',
    tags: ['ministry', 'leadership', 'application'],
    downloadCount: 23
  },
  {
    id: '6',
    title: '2024 Annual Financial Report',
    description: 'Church financial summary and stewardship report',
    category: 'financial',
    fileType: 'pdf',
    fileSize: '3.8 MB',
    uploadDate: '2024-12-01',
    accessLevel: 'member',
    tags: ['financial', 'stewardship', 'annual'],
    downloadCount: 89
  },
  {
    id: '7',
    title: 'Christmas Celebration Announcement',
    description: 'Details for upcoming Christmas programs and events',
    category: 'announcements',
    fileType: 'pdf',
    fileSize: '2.1 MB',
    uploadDate: '2024-12-10',
    accessLevel: 'public',
    tags: ['christmas', 'events'],
    downloadCount: 156
  },
  {
    id: '8',
    title: 'Youth Ministry Handbook',
    description: 'Guidelines and resources for youth ministry volunteers',
    category: 'ministry',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    uploadDate: '2024-09-15',
    accessLevel: 'leader',
    tags: ['youth', 'ministry', 'volunteer'],
    downloadCount: 34
  }
];

export default function DocumentsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Filter documents based on user access level
      const userRole = typeof parsedUser.role === 'string' ? parsedUser.role : parsedUser.role.type;
      const accessibleDocs = mockDocuments.filter(doc => {
        if (doc.accessLevel === 'public') return true;
        if (doc.accessLevel === 'member' && ['member', 'leader', 'pastor', 'admin'].includes(userRole)) return true;
        if (doc.accessLevel === 'leader' && ['leader', 'pastor', 'admin'].includes(userRole)) return true;
        if (doc.accessLevel === 'admin' && userRole === 'admin') return true;
        return false;
      });
      
      setDocuments(accessibleDocs);
      setFilteredDocuments(accessibleDocs);
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    // Filter documents based on search and filters
    let filtered = documents;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }

    if (fileTypeFilter) {
      filtered = filtered.filter(doc => doc.fileType === fileTypeFilter);
    }

    setFilteredDocuments(filtered);
  }, [searchTerm, categoryFilter, fileTypeFilter, documents]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      bylaws: '📋',
      forms: '📝',
      sermons: '🎙️',
      bulletins: '📰',
      announcements: '📢',
      financial: '💰',
      ministry: '⛪'
    };
    return icons[category as keyof typeof icons] || '📄';
  };

  const getFileTypeIcon = (fileType: string) => {
    const icons = {
      pdf: '📕',
      doc: '📄',
      docx: '📄',
      mp3: '🎵',
      video: '🎥'
    };
    return icons[fileType as keyof typeof icons] || '📄';
  };

  const getCategoryName = (category: string) => {
    const names = {
      bylaws: 'Bylaws & Constitution',
      forms: 'Forms & Applications',
      sermons: 'Sermons & Teachings',
      bulletins: 'Service Bulletins',
      announcements: 'Announcements',
      financial: 'Financial Reports',
      ministry: 'Ministry Resources'
    };
    return names[category as keyof typeof names] || category;
  };

  const getAccessLevelBadge = (accessLevel: string) => {
    const variants = {
      public: 'success' as const,
      member: 'info' as const,
      leader: 'warning' as const,
      admin: 'danger' as const
    };
    return variants[accessLevel as keyof typeof variants] || 'info';
  };

  const handleDownload = (document: Document) => {
    // In a real app, this would trigger an actual download
    alert(`Downloading: ${document.title}\n\nThis is a demo - in production this would download the actual file.`);
    
    // Update download count (in real app, this would be done on server)
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id 
        ? { ...doc, downloadCount: doc.downloadCount + 1 }
        : doc
    ));
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
              <span className="text-white font-medium">Church Documents</span>
            </div>
            
            {(user.role === 'admin' || user.role === 'pastor') && (
              <SpectacularButton variant="primary" size="sm">
                Upload Document
              </SpectacularButton>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Church Documents</h1>
          <p className="text-slate-300">
            Access church resources, forms, sermons, and important documents
          </p>
        </div>

        {/* Search and Filters */}
        <SpectacularCard className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-2">Search Documents</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                placeholder="Search by title, description, or tags..."
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="bylaws">Bylaws & Constitution</option>
                <option value="forms">Forms & Applications</option>
                <option value="sermons">Sermons & Teachings</option>
                <option value="bulletins">Service Bulletins</option>
                <option value="announcements">Announcements</option>
                <option value="financial">Financial Reports</option>
                <option value="ministry">Ministry Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">File Type</label>
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="w-full p-3 bg-slate-50 text-slate-800 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="pdf">PDF Documents</option>
                <option value="doc">Word Documents</option>
                <option value="mp3">Audio Files</option>
                <option value="video">Video Files</option>
              </select>
            </div>

            <div className="flex items-end">
              <SpectacularButton
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('');
                  setFileTypeFilter('');
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
            Showing {filteredDocuments.length} of {documents.length} documents
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <SpectacularCard className="p-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Documents Found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || categoryFilter || fileTypeFilter
                ? "Try adjusting your search criteria or filters."
                : "No documents are available for your access level."}
            </p>
            <SpectacularButton
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setFileTypeFilter('');
              }}
            >
              Clear Filters
            </SpectacularButton>
          </SpectacularCard>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <SpectacularCard key={document.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">
                      {getCategoryIcon(document.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-slate-800 mr-4">
                          {document.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <SpectacularBadge 
                            variant={getAccessLevelBadge(document.accessLevel)}
                            size="sm"
                          >
                            {document.accessLevel}
                          </SpectacularBadge>
                          <SpectacularBadge variant="outline" size="sm">
                            {getCategoryName(document.category)}
                          </SpectacularBadge>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-3">
                        {document.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <span>{getFileTypeIcon(document.fileType)}</span>
                          <span>{document.fileType.toUpperCase()}</span>
                        </span>
                        <span>•</span>
                        <span>{document.fileSize}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(document.uploadDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{document.downloadCount} downloads</span>
                      </div>
                      
                      {document.tags && document.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {document.tags.map((tag, index) => (
                            <SpectacularBadge key={index} variant="secondary" size="sm">
                              {tag}
                            </SpectacularBadge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <SpectacularButton
                      onClick={() => handleDownload(document)}
                      size="sm"
                    >
                      Download
                    </SpectacularButton>
                  </div>
                </div>
              </SpectacularCard>
            ))}
          </div>
        )}

        {/* Quick Access Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SpectacularCard className="p-6 text-center">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-slate-800 mb-2">Church Bylaws</h3>
              <p className="text-slate-600 text-sm mb-4">Constitution and governing documents</p>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => setCategoryFilter('bylaws')}
              >
                View Bylaws
              </SpectacularButton>
            </SpectacularCard>

            <SpectacularCard className="p-6 text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold text-slate-800 mb-2">Forms</h3>
              <p className="text-slate-600 text-sm mb-4">Applications and registration forms</p>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => setCategoryFilter('forms')}
              >
                View Forms
              </SpectacularButton>
            </SpectacularCard>

            <SpectacularCard className="p-6 text-center">
              <div className="text-3xl mb-3">🎙️</div>
              <h3 className="font-bold text-slate-800 mb-2">Sermons</h3>
              <p className="text-slate-600 text-sm mb-4">Audio and video teachings</p>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => setCategoryFilter('sermons')}
              >
                View Sermons
              </SpectacularButton>
            </SpectacularCard>

            <SpectacularCard className="p-6 text-center">
              <div className="text-3xl mb-3">📰</div>
              <h3 className="font-bold text-slate-800 mb-2">Latest Bulletin</h3>
              <p className="text-slate-600 text-sm mb-4">Current service order and announcements</p>
              <SpectacularButton
                variant="outline"
                size="sm"
                onClick={() => setCategoryFilter('bulletins')}
              >
                View Bulletins
              </SpectacularButton>
            </SpectacularCard>
          </div>
        </div>

        {/* Help Section */}
        <SpectacularCard className="p-6 mt-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📚 Document Library Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Access Levels:</h4>
              <ul className="space-y-1">
                <li>• <span className="text-green-600 font-medium">Public:</span> Available to everyone</li>
                <li>• <span className="text-blue-600 font-medium">Member:</span> Requires church membership</li>
                <li>• <span className="text-yellow-600 font-medium">Leader:</span> Ministry leaders and above</li>
                <li>• <span className="text-red-600 font-medium">Admin:</span> Church administration only</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Need Help?</h4>
              <ul className="space-y-1">
                <li>• Contact church office for document requests</li>
                <li>• Report broken links or missing documents</li>
                <li>• Request specific resources for ministry</li>
                <li>• Submit documents for approval and upload</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <a href="mailto:admin@foursquareajebo.org" className="text-blue-600 hover:text-blue-700">
              Contact Church Office: admin@foursquareajebo.org
            </a>
          </div>
        </SpectacularCard>
      </div>
    </div>
  );
}

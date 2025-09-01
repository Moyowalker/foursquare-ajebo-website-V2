export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  featuredImage: string;
  images: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: PostStatus;
  featured: boolean;
  readTime: number; // in minutes
  views: number;
  likes: number;
  comments: Comment[];
  seo: SEOData;
}

export interface Author {
  id: string;
  name: string;
  title: string; // Pastor, Minister, etc.
  bio: string;
  avatar: string;
  email: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  approved: boolean;
  replies: Comment[];
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
}

export type BlogCategory = 
  | 'announcements'
  | 'testimonies'
  | 'sermons'
  | 'youth'
  | 'family'
  | 'ministry'
  | 'events'
  | 'devotional'
  | 'prayer'
  | 'community'
  | 'missions'
  | 'leadership';

export type PostStatus = 
  | 'draft'
  | 'published'
  | 'scheduled'
  | 'archived';

export interface BlogFilter {
  category?: BlogCategory[];
  author?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  featured?: boolean;
  status?: PostStatus[];
  searchQuery?: string;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  popularPosts: BlogPost[];
  recentPosts: BlogPost[];
  topCategories: {
    category: BlogCategory;
    count: number;
  }[];
}

export const blogCategories = [
  { value: 'announcements', label: 'Announcements', icon: '📢', color: '#dc2626' },
  { value: 'testimonies', label: 'Testimonies', icon: '✨', color: '#059669' },
  { value: 'sermons', label: 'Sermons', icon: '📖', color: '#7c3aed' },
  { value: 'youth', label: 'Youth', icon: '👥', color: '#2563eb' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', color: '#db2777' },
  { value: 'ministry', label: 'Ministry', icon: '⛪', color: '#9333ea' },
  { value: 'events', label: 'Events', icon: '🎉', color: '#ea580c' },
  { value: 'devotional', label: 'Devotional', icon: '🙏', color: '#0891b2' },
  { value: 'prayer', label: 'Prayer', icon: '🕊️', color: '#65a30d' },
  { value: 'community', label: 'Community', icon: '🤝', color: '#dc2626' },
  { value: 'missions', label: 'Missions', icon: '🌍', color: '#7c2d12' },
  { value: 'leadership', label: 'Leadership', icon: '👑', color: '#991b1b' }
] as const;

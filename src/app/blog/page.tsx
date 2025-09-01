'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost, BlogCategory, blogCategories } from '@/types/blog';
import { getBlogPosts, getFeaturedPosts, getCategoryStats, searchPosts } from '@/data/blog';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const categoryStats = getCategoryStats();

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (searchQuery) {
      posts = searchPosts(searchQuery);
    }

    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryChange = (category: BlogCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getCategoryInfo = (categoryValue: string) => {
    return blogCategories.find(cat => cat.value === categoryValue);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Church Blog & News
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stay connected with the latest updates, testimonies, and inspiring stories from our church family.
              Discover how God is moving in our community and beyond.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts, testimonies, announcements..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600">
                Don't miss these highlighted posts from our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredPosts.map((post) => (
                <SpectacularCard key={post.id} className="h-full" glow>
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-2xl flex items-center justify-center text-white text-4xl">
                      {getCategoryInfo(post.category)?.icon || '📝'}
                    </div>
                    <div className="absolute top-4 right-4">
                      <SpectacularBadge variant="success" size="sm">
                        Featured
                      </SpectacularBadge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span 
                        className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getCategoryInfo(post.category)?.color }}
                      >
                        {getCategoryInfo(post.category)?.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>{post.author.name}</span>
                      </div>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>👁️ {post.views}</span>
                        <span>❤️ {post.likes}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <SpectacularButton size="sm">
                          Read More
                        </SpectacularButton>
                      </Link>
                    </div>
                  </div>
                </SpectacularCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="relative py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Posts ({allPosts.length})
            </button>
            {categoryStats.map((stat) => (
              <button
                key={stat.category}
                onClick={() => handleCategoryChange(stat.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === stat.category
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: selectedCategory === stat.category ? stat.color : undefined
                }}
              >
                <span>{stat.icon}</span>
                {stat.label} ({stat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedPosts.map((post) => (
                  <SpectacularCard key={post.id} className="h-full" hover>
                    <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl flex items-center justify-center text-white text-4xl">
                      {getCategoryInfo(post.category)?.icon || '📝'}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getCategoryInfo(post.category)?.color }}
                        >
                          {getCategoryInfo(post.category)?.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime} min read
                        </span>
                      </div>

                      <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <span>{post.author.name}</span>
                        </div>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>👁️ {post.views}</span>
                          <span>❤️ {post.likes}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <SpectacularButton size="sm">
                            Read More
                          </SpectacularButton>
                        </Link>
                      </div>
                    </div>
                  </SpectacularCard>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <SpectacularButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </SpectacularButton>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <SpectacularButton
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </SpectacularButton>
                  ))}

                  <SpectacularButton
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </SpectacularButton>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No posts found</h3>
              <p className="text-gray-500 mb-8">
                {searchQuery 
                  ? `No posts match your search for "${searchQuery}"`
                  : `No posts available in the ${getCategoryInfo(selectedCategory as string)?.label || selectedCategory} category`
                }
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <SpectacularButton
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                >
                  View All Posts
                </SpectacularButton>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SpectacularCard className="p-12">
              <div className="text-6xl mb-6">📬</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Stay Connected
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Subscribe to our blog newsletter and never miss an update, testimony, or announcement from our church family.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <SpectacularButton className="px-8 py-3">
                  Subscribe 📧
                </SpectacularButton>
              </div>

              <p className="text-sm text-gray-500">
                Join 1,000+ church members who stay updated with our weekly newsletter.
              </p>
            </SpectacularCard>
          </div>
        </div>
      </section>
    </div>
  );
}

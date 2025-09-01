'use client';

import { useState, useEffect, createElement } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, blogCategories } from '@/types/blog';
import { getPostBySlug, getRecentPosts, getPostsByCategory } from '@/data/blog';
import { SpectacularButton, SpectacularCard, SpectacularBadge } from '@/components/ui/spectacular';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost || null);
      
      if (foundPost) {
        // Get related posts from the same category
        const related = getPostsByCategory(foundPost.category, 3)
          .filter(p => p.id !== foundPost.id);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-semibold text-gray-700">Loading post...</h2>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Post not found</h2>
          <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <SpectacularButton>
              ← Back to Blog
            </SpectacularButton>
          </Link>
        </div>
      </div>
    );
  }

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

  const categoryInfo = getCategoryInfo(post.category);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/blog" className="hover:text-red-600">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category and Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: categoryInfo?.color }}
              >
                {categoryInfo?.icon} {categoryInfo?.label}
              </span>
              {post.featured && (
                <SpectacularBadge variant="success" size="sm">
                  Featured
                </SpectacularBadge>
              )}
              <span className="text-sm text-gray-500">
                {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.author.title}</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <div>Published {formatDate(post.publishedAt)}</div>
                {post.updatedAt > post.publishedAt && (
                  <div>Updated {formatDate(post.updatedAt)}</div>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>👁️ {post.views}</span>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <div className="h-64 md:h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-6xl">
                {categoryInfo?.icon || '📝'}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {post.title} - {categoryInfo?.label}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </div>
              
              {/* Split content by paragraphs and format */}
              <div className="space-y-6 text-gray-800 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s*/, '');
                    const headingLevel = Math.min(level + 1, 6);
                    return createElement(
                      `h${headingLevel}`,
                      { 
                        key: index, 
                        className: "font-bold text-gray-900 mt-8 mb-4" 
                      },
                      text
                    );
                  }
                  
                  if (paragraph.startsWith('*"') && paragraph.endsWith('"*')) {
                    return (
                      <blockquote key={index} className="border-l-4 border-red-500 pl-6 py-4 bg-gray-50 rounded-r-lg italic text-lg text-gray-700">
                        {paragraph.slice(2, -2)}
                      </blockquote>
                    );
                  }
                  
                  if (paragraph.startsWith('> "')) {
                    return (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg text-lg text-blue-800">
                        {paragraph.slice(2)}
                      </blockquote>
                    );
                  }
                  
                  if (paragraph.includes('**') || paragraph.includes('*')) {
                    const formattedText = paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>');
                    return (
                      <p key={index} dangerouslySetInnerHTML={{ __html: formattedText }} />
                    );
                  }
                  
                  return paragraph.trim() ? (
                    <p key={index}>{paragraph}</p>
                  ) : null;
                })}
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{post.author.name}</h4>
                  <p className="text-red-600 font-medium mb-2">{post.author.title}</p>
                  <p className="text-gray-600 leading-relaxed">{post.author.bio}</p>
                  {Object.keys(post.author.socialMedia).length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {post.author.socialMedia.facebook && (
                        <a href={post.author.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          Facebook
                        </a>
                      )}
                      {post.author.socialMedia.twitter && (
                        <a href={post.author.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                          Twitter
                        </a>
                      )}
                      {post.author.socialMedia.instagram && (
                        <a href={post.author.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          Instagram
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Share and Actions */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-12 p-6 bg-gradient-to-r from-red-50 to-purple-50 rounded-2xl">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Enjoyed this post?</h3>
                <p className="text-gray-600">Share it with your friends and family!</p>
              </div>
              <div className="flex gap-3">
                <SpectacularButton size="sm" variant="outline">
                  📧 Share via Email
                </SpectacularButton>
                <SpectacularButton size="sm" variant="outline">
                  📱 Share on WhatsApp
                </SpectacularButton>
                <SpectacularButton size="sm">
                  ❤️ Like ({post.likes})
                </SpectacularButton>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Related Posts
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <SpectacularCard key={relatedPost.id} className="h-full" hover>
                    <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 rounded-t-2xl flex items-center justify-center text-white text-4xl">
                      {getCategoryInfo(relatedPost.category)?.icon || '📝'}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: getCategoryInfo(relatedPost.category)?.color }}
                        >
                          {getCategoryInfo(relatedPost.category)?.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {relatedPost.readTime} min read
                        </span>
                      </div>

                      <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>👁️ {relatedPost.views}</span>
                          <span>❤️ {relatedPost.likes}</span>
                        </div>
                        <Link href={`/blog/${relatedPost.slug}`}>
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
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Link href="/blog">
            <SpectacularButton variant="outline" size="lg">
              ← Back to All Posts
            </SpectacularButton>
          </Link>
        </div>
      </section>
    </div>
  );
}

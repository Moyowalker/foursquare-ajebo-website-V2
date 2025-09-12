import { mockBlogPosts } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

// Static generation for build-time optimization
export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
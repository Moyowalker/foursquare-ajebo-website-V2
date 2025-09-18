import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="block w-full btn-primary px-6 py-3 text-center">
            Go Home
          </Link>
          
          <Link href="/contact" className="block w-full btn-outline px-6 py-3 text-center">
            Contact Us
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Error 404 - Page Not Found</p>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Information | Foursquare Gospel Church Ajebo',
  description: 'Access legal documents, policies, and important information for Foursquare Gospel Church Ajebo.',
  keywords: ['legal information', 'church policies', 'terms', 'privacy', 'Foursquare Camp Ajebo'],
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Legal Information</h1>
            <p className="text-blue-100 mt-2">
              Important legal documents and policies
            </p>
          </div>
          
          <div className="px-6 py-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Privacy Policy */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Privacy Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn how we collect, use, and protect your personal information 
                  when you use our website and services.
                </p>
                <Link 
                  href="/privacy" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Privacy Policy →
                </Link>
              </div>

              {/* Terms of Service */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Terms of Service
                </h2>
                <p className="text-gray-600 mb-4">
                  Review the terms and conditions that govern your use of our 
                  website and digital services.
                </p>
                <Link 
                  href="/terms" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Terms of Service →
                </Link>
              </div>

              {/* Cookie Policy */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Cookie Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  Understand how we use cookies and similar technologies to 
                  improve your browsing experience.
                </p>
                <div className="text-gray-500 italic">
                  Included in Privacy Policy
                </div>
              </div>

              {/* Donation Policy */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Donation Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  Information about our donation practices, tax receipts, and 
                  how your contributions are used.
                </p>
                <div className="text-gray-500 italic">
                  Included in Terms of Service
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Legal Questions?
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our legal policies or need clarification 
                on any of these documents, please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@foursquareajebo.org
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +234 (0) 123 456 7890
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Foursquare Gospel Church Ajebo, Ajebo, Ogun State, Nigeria
                </p>
              </div>
              <div className="mt-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                These legal documents are updated periodically. The "Last updated" date 
                on each document indicates when it was last revised. By continuing to 
                use our services, you agree to the most current version of these terms.
              </p>
            </div>

            {/* Church Information */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Church Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Registration</h3>
                  <p className="text-gray-600 text-sm">
                    Foursquare Gospel Church Ajebo is a registered religious 
                    organization in Nigeria.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tax Status</h3>
                  <p className="text-gray-600 text-sm">
                    Donations may be tax-deductible. Please consult with a 
                    tax professional for specific guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
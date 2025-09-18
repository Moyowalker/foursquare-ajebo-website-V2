import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Foursquare Gospel Church Ajebo',
  description: 'Learn how Foursquare Gospel Church Ajebo protects your privacy and handles your personal information.',
  keywords: ['privacy policy', 'data protection', 'church privacy', 'Foursquare Camp Ajebo'],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="text-blue-100 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="px-6 py-8 prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              Foursquare Gospel Church Ajebo ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Name and contact information (email, phone number)</li>
                <li>Donation information and payment details</li>
                <li>Prayer requests and testimonies</li>
                <li>Event registration information</li>
                <li>Member directory information (for registered members)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our website</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To process donations and send receipts</li>
              <li>To communicate about church events and activities</li>
              <li>To respond to your inquiries and prayer requests</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>With your explicit consent</li>
              <li>To service providers who assist us in operating our website</li>
              <li>To comply with legal requirements or protect our rights</li>
              <li>In connection with a merger, sale, or transfer of assets</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cookies
            </h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies to enhance your browsing experience. You can choose to 
              disable cookies through your browser settings, though this may affect some 
              functionality of our website.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not directed to children under 13. We do not knowingly collect 
              personal information from children under 13. If you become aware that a child 
              has provided us with personal information, please contact us.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the 
              "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Foursquare Gospel Church Ajebo</strong></p>
              <p className="text-gray-700">Email: info@foursquareajebo.org</p>
              <p className="text-gray-700">Phone: +234 (0) 123 456 7890</p>
              <p className="text-gray-700">Address: Ajebo, Ogun State, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
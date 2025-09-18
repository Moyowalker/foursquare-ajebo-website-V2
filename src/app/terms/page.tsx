import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Foursquare Gospel Church Ajebo',
  description: 'Read the terms and conditions for using Foursquare Gospel Church Ajebo website and services.',
  keywords: ['terms of service', 'terms and conditions', 'church terms', 'Foursquare Camp Ajebo'],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            <p className="text-blue-100 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="px-6 py-8 prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By accessing and using the Foursquare Gospel Church Ajebo website 
              ("Service"), you accept and agree to be bound by the terms and 
              provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Use License
            </h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access and use the materials on 
              Foursquare Gospel Church Ajebo's website for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a 
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              User Accounts
            </h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is 
              accurate, complete, and current at all times. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Safeguarding the password and all activities under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring your account information remains accurate and up-to-date</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Donations and Payments
            </h2>
            <p className="text-gray-700 mb-4">
              When making donations through our website:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>All donations are voluntary and non-refundable unless required by law</li>
              <li>Payment information is processed securely through third-party providers</li>
              <li>Tax receipts will be provided for eligible donations</li>
              <li>We reserve the right to refuse or return any donation</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Content and Conduct
            </h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Post offensive, inappropriate, or harmful content</li>
              <li>Harass, abuse, or harm others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute spam or unauthorized advertising</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, 
              which also governs your use of the Service, to understand our practices.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-700 mb-6">
              The materials on Foursquare Gospel Church Ajebo's website are provided 
              on an 'as is' basis. Foursquare Gospel Church Ajebo makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other 
              warranties including without limitation, implied warranties or conditions 
              of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Limitations
            </h2>
            <p className="text-gray-700 mb-6">
              In no event shall Foursquare Gospel Church Ajebo or its suppliers be 
              liable for any damages (including, without limitation, damages for loss 
              of data or profit, or due to business interruption) arising out of the 
              use or inability to use the materials on our website, even if we have 
              been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Accuracy of Materials
            </h2>
            <p className="text-gray-700 mb-6">
              The materials appearing on our website could include technical, 
              typographical, or photographic errors. We do not warrant that any of 
              the materials on its website are accurate, complete, or current. We may 
              make changes to the materials contained on its website at any time 
              without notice.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Links to Third-Party Websites
            </h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party websites. We have no 
              control over, and assume no responsibility for, the content, privacy 
              policies, or practices of any third-party websites.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Termination
            </h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account and bar access to the Service 
              immediately, without prior notice or liability, under our sole discretion, 
              for any reason whatsoever including without limitation if you breach 
              the Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be interpreted and governed by the laws of Nigeria, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these 
              Terms at any time. If a revision is material, we will provide at least 
              30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
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
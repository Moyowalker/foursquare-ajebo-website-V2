import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Play, Monitor, Smartphone, Wifi, Clock, Calendar, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Streaming | Foursquare Gospel Church Ajebo',
  description: 'Join our live worship services online from anywhere in the world. Stream on any device and be part of our global church family.',
  keywords: ['live streaming', 'online church', 'watch live', 'virtual service', 'Foursquare Camp Ajebo'],
};

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-indigo-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          import { redirect } from 'next/navigation';

          export default function StreamingPage() {
            redirect('/services');
          }
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Setup</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Internet Speed:</strong> 10+ Mbps for best quality</p>
                  <p><strong>Display:</strong> Large screen or computer monitor</p>
                  <p><strong>Audio:</strong> Quality speakers or sound system</p>
                  <p><strong>Environment:</strong> Quiet space for focused worship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Streaming?</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Our technical support team is available to help you with any streaming issues 
              or questions. Don't let technical difficulties keep you from joining us online!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                Get Technical Support
              </Link>
              <Link 
                href="/streaming" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors font-medium"
              >
                Test Your Connection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
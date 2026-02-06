import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, MapPin, Users, Building, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forms & Applications | Foursquare Camp Ajebo',
  description: 'Access official forms and applications for Foursquare Camp Ajebo including land allocation, membership, and event registration forms.',
  keywords: ['forms', 'applications', 'land allocation', 'membership', 'registration', 'Foursquare Camp Ajebo'],
};

export default function FormsPage() {
  const forms = [
    {
      id: 'land-allocation',
      title: 'Land Allocation Form',
      description: 'Apply for land allocation at Allen Camp through the Foursquare City Development Board.',
      href: '/forms/land-allocation',
      icon: MapPin,
      category: 'Development',
      status: 'Available',
      requirements: ['Church membership verification', 'Valid identification', 'Financial capability assessment'],
      estimatedTime: '15-20 minutes'
    },
    {
      id: 'damages-to-camp-assets',
      title: 'Damages to Camp Assets Form',
      description: 'Report any damage observed to camp assets before, during, or after program use of facilities.',
      href: '/forms/damages-to-camp-assets',
      icon: AlertTriangle,
      category: 'Facilities',
      status: 'Available',
      requirements: ['Program details and dates', 'Asset condition checklist', 'Signatures from program and board'],
      estimatedTime: '10-15 minutes'
    },
    // Future forms can be added here
    {
      id: 'membership',
      title: 'Membership Application',
      description: 'Apply for church membership and join the Foursquare family.',
      href: '/forms/membership',
      icon: Users,
      category: 'Membership',
      status: 'Coming Soon',
      requirements: ['Baptism certificate', 'Letter of transfer (if applicable)', 'Personal testimony'],
      estimatedTime: '10-15 minutes'
    },
    {
      id: 'event-registration',
      title: 'Event Registration',
      description: 'Register for conferences, retreats, and special church events.',
      href: '/forms/event-registration',
      icon: Building,
      category: 'Events',
      status: 'Coming Soon',
      requirements: ['Event details selection', 'Accommodation preferences', 'Dietary requirements'],
      estimatedTime: '5-10 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Forms & Applications</h1>
            <p className="text-xl text-blue-100">
              Access official forms and applications for various church services, 
              development projects, and membership processes.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Forms</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete and submit forms digitally for faster processing. 
              All submissions are secure and handled by our administrative team.
            </p>
          </div>

          {/* Forms Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {forms.map((form) => {
              const IconComponent = form.icon;
              const isAvailable = form.status === 'Available';
              
              return (
                <div key={form.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                          isAvailable ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            isAvailable ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{form.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isAvailable 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {form.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {form.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {form.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {form.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Estimated Time */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Estimated time: {form.estimatedTime}
                      </span>
                      
                      {isAvailable ? (
                        <Link 
                          href={form.href}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Start Application
                        </Link>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600">
                If you need assistance with any form or have questions about the application process, 
                our team is here to help.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Having trouble with the online forms?
                </p>
                <Link 
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact IT Support
                </Link>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">General Inquiries</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Questions about requirements or processes?
                </p>
                <Link 
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact Administration
                </Link>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Visit Us</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Prefer to submit forms in person?
                </p>
                <Link 
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Office Hours & Location
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
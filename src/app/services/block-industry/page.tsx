 import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Factory, Layers, Truck, CheckCircle2, Hammer, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Block Industry | Foursquare Camp Ajebo',
  description: 'On-site block industry providing quality building blocks for construction and community development projects.',
  keywords: ['block industry', 'construction', 'building blocks', 'camp ajebo'],
};

export default function BlockIndustryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services" 
            className="inline-flex items-center text-slate-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Block Industry</h1>
          <p className="text-xl text-slate-200 max-w-3xl">
            Producing durable building blocks to support camp expansion and community projects.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality Blocks for Trusted Builds</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our block industry produces high-quality blocks for camp facilities, church projects, and community development. 
              We focus on durability, consistency, and timely supply.
            </p>
          </div>

          {/* Product & Capabilities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Standard Blocks',
                icon: Layers,
                color: 'bg-slate-100 text-slate-700',
                description: 'Reliable blocks for residential, commercial, and institutional construction.'
              },
              {
                title: 'Bulk Orders',
                icon: Truck,
                color: 'bg-blue-100 text-blue-700',
                description: 'Capacity to meet large orders for events, buildings, and infrastructure.'
              },
              {
                title: 'On-site Production',
                icon: Factory,
                color: 'bg-amber-100 text-amber-700',
                description: 'Efficient production within the camp for fast supply and quality control.'
              },
              {
                title: 'Quality Assurance',
                icon: ShieldCheck,
                color: 'bg-emerald-100 text-emerald-700',
                description: 'Consistent mix ratios and curing standards for strong, durable blocks.'
              },
              {
                title: 'Construction Support',
                icon: Hammer,
                color: 'bg-orange-100 text-orange-700',
                description: 'Guidance for builders and project teams to ensure proper use.'
              },
              {
                title: 'Community Impact',
                icon: CheckCircle2,
                color: 'bg-purple-100 text-purple-700',
                description: 'Supporting church and community development projects across the region.'
              }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Ordering Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Place an Order</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                'Share your project requirements and volume needs',
                'Receive pricing and production schedule',
                'Confirm order and delivery preferences',
                'Collect or arrange delivery on agreed date'
              ].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="bg-gradient-to-r from-slate-700 to-gray-800 rounded-xl shadow-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Block Industry Location</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Site</p>
                      <p className="text-slate-200 text-sm">Foursquare Camp Ajebo, Ogun State, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Production Desk</p>
                      <p className="text-slate-200 text-sm">Contact us for pricing and order scheduling</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
                <p className="text-slate-200 mb-6">
                  Get in touch for pricing, production timelines, and delivery options.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium text-center"
                  >
                    Contact Production Team
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-slate-700 transition-colors font-medium text-center"
                  >
                    Request Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Star } from 'lucide-react';
import { Facility } from '@/lib/image-config';

interface FacilityCardProps {
  facility: Facility;
  showLink?: boolean;
  className?: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility, 
  showLink = true,
  className = '' 
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'accommodation':
        return 'bg-blue-100 text-blue-800';
      case 'conference':
        return 'bg-purple-100 text-purple-800';
      case 'recreation':
        return 'bg-green-100 text-green-800';
      case 'dining':
        return 'bg-orange-100 text-orange-800';
      case 'infrastructure':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubcategoryIcon = (subcategory?: string) => {
    if (subcategory === 'premium') return <Star className="w-4 h-4 text-yellow-500" />;
    if (subcategory === 'leadership') return <Users className="w-4 h-4 text-blue-500" />;
    return null;
  };

  // Get the first image or use placeholder
  const primaryImage = facility.images && facility.images.length > 0 
    ? facility.images[0] 
    : null;

  const CardContent = () => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Images coming soon</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(facility.category)}`}>
            {facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}
          </span>
        </div>

        {/* Subcategory Icon */}
        {facility.subcategory && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-1">
            {getSubcategoryIcon(facility.subcategory)}
          </div>
        )}

        {/* Image Count */}
        {facility.images && facility.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            +{facility.images.length - 1} more
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {facility.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {facility.description}
        </p>

        {/* Capacity */}
        {facility.capacity && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Users className="w-4 h-4 mr-1" />
            <span>{facility.capacity}</span>
          </div>
        )}

        {/* Features */}
        {facility.features && facility.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {facility.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {feature}
                </span>
              ))}
              {facility.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                  +{facility.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details Link */}
        {showLink && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
              View Details →
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href={`/facilities/${facility.category}/${facility.id}`}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default FacilityCard;
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board of Directors | Foursquare Camp Ajebo',
  description: 'Meet our dedicated board of directors providing spiritual guidance, strategic direction, and administrative oversight.',
  keywords: ['board', 'directors', 'leadership', 'pastors', 'elders', 'deacons', 'Foursquare Camp Ajebo'],
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
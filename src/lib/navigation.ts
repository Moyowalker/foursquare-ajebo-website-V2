export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  items?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us", 
    href: "/about",
    items: [
      {
        title: "Our Mission",
        href: "/about/mission",
        description: "Our calling and purpose as a church"
      },
      {
        title: "Our Vision", 
        href: "/about/vision",
        description: "Where we're headed as a faith community"
      },
      {
        title: "Our Values",
        href: "/about/values", 
        description: "The principles that guide our ministry"
      },
      {
        title: "Our Journey",
        href: "/about/journey",
        description: "The history and growth of our church"
      },
    ]
  },
  {
    title: "Our Services",
    href: "/services",
    items: [
      {
        title: "Worship Services",
        href: "/services/worship",
        description: "Join us for inspiring worship experiences"
      },
      {
        title: "Events & Programs", 
        href: "/services/events",
        description: "Special events, conferences, and programs"
      },
      {
        title: "Ministry Programs",
        href: "/services/ministry", 
        description: "Youth, adult, and family ministries"
      },
      {
        title: "Live Streaming",
        href: "/services/streaming",
        description: "Join us online for live services"
      },
    ]
  },
  {
    title: "Announcements",
    href: "/announcements",
    description: "Latest news, updates, and important announcements"
  },
  {
    title: "Our Leadership",
    href: "/leadership", 
    items: [
      {
        title: "Board of Directors",
        href: "/leadership/board",
        description: "Meet our church leadership team"
      },
      {
        title: "Ministry Team",
        href: "/leadership/ministry-team", 
        description: "Our pastors and ministry leaders"
      },
    ]
  },
  {
    title: "Services & Facilities",
    href: "/facilities",
    items: [
      {
        title: "Accommodation",
        href: "/facilities/accommodation",
        description: "Comfortable lodging for retreats and events"
      },
      {
        title: "Conference Halls",
        href: "/facilities/conference-halls",
        description: "Professional meeting and event spaces"
      },
      {
        title: "Recreation",
        href: "/facilities/recreation",
        description: "Sports, dining, and recreational amenities"
      },
    ]
  },
  {
    title: "Giving",
    href: "/giving",
    items: [
      {
        title: "Ways to Give",
        href: "/giving",
        description: "Learn about different ways to support our ministry"
      },
      {
        title: "Make a Donation",
        href: "/giving/donate",
        description: "Give online or view bank account details"
      },
    ]
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

export const footerNav = [
  {
    title: "Quick Links",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Our Services", href: "/services" },
      { title: "Leadership", href: "/leadership" },
      { title: "Facilities", href: "/facilities" },
    ]
  },
  {
    title: "Services",
    items: [
      { title: "Worship", href: "/services/worship" },
      { title: "Events", href: "/services/events" },
      { title: "Ministry", href: "/services/ministry" },
      { title: "Streaming", href: "/services/streaming" },
    ]
  },
  {
    title: "Connect",
    items: [
      { title: "Contact", href: "/contact" },
      { title: "Giving", href: "/giving" },
      { title: "Visit Us", href: "/contact#location" },
    ]
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Legal", href: "/legal" },
    ]
  },
];

// Utility function to get all navigation links (for sitemap generation)
export function getAllNavLinks(): string[] {
  const links: string[] = [];
  
  function extractLinks(items: NavItem[]) {
    items.forEach(item => {
      if (item.href) {
        links.push(item.href);
      }
      if (item.items) {
        extractLinks(item.items);
      }
    });
  }
  
  extractLinks(mainNav);
  
  // Add footer links
  footerNav.forEach(section => {
    section.items.forEach(item => {
      if (item.href && !links.includes(item.href)) {
        links.push(item.href);
      }
    });
  });
  
  return links;
}
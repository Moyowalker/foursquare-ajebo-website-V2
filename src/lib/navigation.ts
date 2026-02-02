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
        description: "How we host retreats, events, and stays"
      },
      {
        title: "Our Vision", 
        href: "/about/vision",
        description: "Where the camp is headed as a retreat campus"
      },
      {
        title: "Our Values",
        href: "/about/values", 
        description: "The hosting principles that guide the campus"
      },
      {
        title: "Our Journey",
        href: "/about/journey",
        description: "How the camp grew into a full campus"
      },
    ]
  },
  {
    title: "Services",
    href: "/services",
    items: [
      {
        title: "Accommodation",
        href: "/facilities/accommodation",
        description: "Comfortable lodging for retreats and events"
      },
      {
        title: "Events & Ministry Programs", 
        href: "/services/events",
        description: "Events, camps, retreats, and ministry departments"
      },
      {
        title: "Nursery & Primary School",
        href: "/services/nursery-primary-school",
        description: "Early childhood and primary education on campus"
      },
      {
        title: "Medical Centre",
        href: "/services/medical-centre",
        description: "Standard healthcare services for guests and residents"
      },
      {
        title: "Block Industry",
        href: "/services/block-industry",
        description: "Quality block production and construction support"
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
    title: "Our Leadership",
    href: "/leadership", 
    items: [
      {
        title: "Board of Directors",
        href: "/leadership/board",
        description: "Meet our church leadership team"
      },
      {
        title: "Camp Executive Team",
        href: "/leadership/executives",
        description: "Meet the camp management and operations leaders"
      },
    ]
  },
  {
    title: "Forms & Applications",
    href: "/forms",
    items: [
      {
        title: "Land Allocation Form",
        href: "/forms/land-allocation",
        description: "Apply for land allocation at Allen Camp"
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
      { title: "Events & Ministry", href: "/services/events" },
      { title: "Nursery & Primary School", href: "/services/nursery-primary-school" },
      { title: "Medical Centre", href: "/services/medical-centre" },
      { title: "Block Industry", href: "/services/block-industry" },
    ]
  },
  {
    title: "Connect",
    items: [
      { title: "Contact", href: "/contact" },
      { title: "Announcements", href: "/announcements" },
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
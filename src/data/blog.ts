import { BlogPost, Author, BlogCategory, blogCategories } from '@/types/blog';

// Mock authors
export const authors: Author[] = [
  {
    id: 'pastor-john',
    name: 'Pastor John Doe',
    title: 'Senior Pastor',
    bio: 'Pastor John has been leading Foursquare Ajebo for over 15 years, passionate about youth ministry and community outreach.',
    avatar: '/images/authors/pastor-john.jpg',
    email: 'pastor.john@foursquareajebo.org',
    socialMedia: {
      facebook: 'https://facebook.com/pastorjohn',
      twitter: 'https://twitter.com/pastorjohn',
      instagram: 'https://instagram.com/pastorjohn'
    }
  },
  {
    id: 'minister-sarah',
    name: 'Minister Sarah Johnson',
    title: 'Youth Pastor',
    bio: 'Minister Sarah leads our vibrant youth ministry and coordinates our annual summer camps.',
    avatar: '/images/authors/minister-sarah.jpg',
    email: 'sarah@foursquareajebo.org',
    socialMedia: {
      instagram: 'https://instagram.com/ministersarah',
      facebook: 'https://facebook.com/ministersarah'
    }
  },
  {
    id: 'deacon-michael',
    name: 'Deacon Michael Williams',
    title: 'Community Outreach Director',
    bio: 'Deacon Michael oversees our community programs and leads missions work in local communities.',
    avatar: '/images/authors/deacon-michael.jpg',
    email: 'michael@foursquareajebo.org',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michaelwilliams'
    }
  }
];

// Mock blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: 'summer-camp-2025-announcement',
    title: 'Summer Youth Camp 2025: "Fire & Faith" - Registration Now Open!',
    slug: 'summer-camp-2025-announcement',
    excerpt: 'Join us for an unforgettable week of spiritual growth, adventure, and fellowship at our annual Summer Youth Camp. Early bird registration ends March 31st!',
    content: `
# Summer Youth Camp 2025: "Fire & Faith"

We are excited to announce that registration is now open for our annual Summer Youth Camp 2025! This year's theme, "Fire & Faith," promises to be our most impactful camp yet.

## What to Expect

### Spiritual Growth
- Daily worship sessions with live music
- Powerful teaching sessions on faith foundations
- Personal prayer and reflection time
- Baptism opportunities for those ready to take the next step

### Adventure Activities
- Rock climbing and rappelling
- Canoeing and water sports
- Team building challenges
- Talent show and creative competitions

### Fellowship & Community
- Small group discussions led by trained counselors
- Campfire testimonies and sharing circles
- Late-night fellowship and games
- Lifelong friendships and connections

## Camp Details

**Dates:** July 15-22, 2025  
**Location:** Camp Shiloh, Jos Plateau  
**Ages:** 13-18 years  
**Cost:** ₦25,000 (Early bird: ₦20,000 until March 31st)  
**Capacity:** 200 campers  

## What's Included

- All meals and accommodation
- Transportation to and from camp
- All activity equipment and materials
- Camp t-shirt and memory book
- Professional photography of camp activities
- 24/7 medical supervision

## Registration Process

1. Complete the online registration form
2. Submit required medical forms
3. Pay the registration fee
4. Attend the mandatory parent orientation (June 15th)

Don't miss out on this life-changing experience! Spaces are filling up quickly.

**Register today:** [foursquareajebo.org/camp-registration](https://foursquareajebo.org/camp-registration)

For questions, contact Minister Sarah at sarah@foursquareajebo.org or call (234) 801-234-5678.

*"For our God is a consuming fire." - Hebrews 12:29*
    `,
    author: authors[1], // Minister Sarah
    category: 'announcements',
    tags: ['summer camp', 'youth', 'registration', 'faith', 'adventure'],
    featuredImage: '/images/blog/summer-camp-2025.jpg',
    images: [
      '/images/blog/summer-camp-2025-1.jpg',
      '/images/blog/summer-camp-2025-2.jpg',
      '/images/blog/summer-camp-2025-3.jpg'
    ],
    publishedAt: new Date('2025-02-15T10:00:00Z'),
    updatedAt: new Date('2025-02-15T10:00:00Z'),
    status: 'published',
    featured: true,
    readTime: 4,
    views: 1250,
    likes: 89,
    comments: [],
    seo: {
      metaTitle: 'Summer Youth Camp 2025 Registration Open | Foursquare Ajebo',
      metaDescription: 'Join us for Summer Youth Camp 2025: Fire & Faith. Register now for an unforgettable week of spiritual growth and adventure. Early bird pricing until March 31st.',
      keywords: ['summer camp', 'youth camp', 'foursquare', 'nigeria', 'christian camp', 'registration'],
      ogImage: '/images/blog/summer-camp-2025-og.jpg',
      ogTitle: 'Summer Youth Camp 2025: Fire & Faith - Registration Open!',
      ogDescription: 'An unforgettable week of spiritual growth, adventure, and fellowship awaits at our annual Summer Youth Camp.'
    }
  },
  {
    id: 'testimony-healing-miracle',
    title: 'Testimony: God\'s Healing Power in Our Midst',
    slug: 'testimony-healing-miracle',
    excerpt: 'Sister Mary shares her powerful testimony of divine healing during our recent prayer and fasting week. A reminder that our God still performs miracles today.',
    content: `
# God's Healing Power in Our Midst

*As shared by Sister Mary Okonkwo during our Sunday service*

## The Challenge

Three months ago, I received news that shook my world. The doctors diagnosed me with a condition that seemed insurmountable. Fear gripped my heart, and I found myself questioning everything I believed about God's goodness.

## The Journey of Faith

During our church's 21-day prayer and fasting period in January, I decided to surrender everything to God. I joined the early morning prayer sessions, participated in the fasting, and immersed myself in God's Word like never before.

### Week 1: Surrender
The first week was about letting go. I had to release my fears, my timeline, and my understanding of how God should work.

### Week 2: Seeking
In the second week, I dove deep into scriptures about healing. I memorized verses like Isaiah 53:5 and 1 Peter 2:24.

### Week 3: Breakthrough
By the third week, something had shifted in my spirit. Peace that surpassed understanding filled my heart.

## The Miracle

When I returned to the hospital for my follow-up examination, the doctors were amazed. The condition was completely gone! They ran the tests multiple times, unable to explain what they saw.

## The Testimony

Today, I stand as a living testimony that our God is still in the miracle business. His healing power is as real today as it was 2000 years ago.

> "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed." - Isaiah 53:5

## Prayer for You

If you're reading this and facing your own mountain, I want to pray for you:

*"Father, I lift up every reader who needs Your healing touch. You are the same yesterday, today, and forever. Let Your healing power flow in their lives. Strengthen their faith and let them experience Your goodness. In Jesus' name, Amen."*

---

*If this testimony has blessed you or if you need prayer, don't hesitate to reach out to our pastoral team. We believe in the power of corporate prayer and standing with you in faith.*
    `,
    author: authors[0], // Pastor John
    category: 'testimonies',
    tags: ['healing', 'miracle', 'testimony', 'faith', 'prayer'],
    featuredImage: '/images/blog/healing-testimony.jpg',
    images: ['/images/blog/healing-testimony-1.jpg'],
    publishedAt: new Date('2025-02-10T15:30:00Z'),
    updatedAt: new Date('2025-02-10T15:30:00Z'),
    status: 'published',
    featured: true,
    readTime: 6,
    views: 890,
    likes: 156,
    comments: [],
    seo: {
      metaTitle: 'Powerful Healing Testimony | Foursquare Ajebo',
      metaDescription: 'Read Sister Mary\'s inspiring testimony of divine healing during our prayer and fasting week. God still performs miracles today.',
      keywords: ['healing testimony', 'miracle', 'divine healing', 'foursquare', 'faith'],
      ogImage: '/images/blog/healing-testimony-og.jpg',
      ogTitle: 'God\'s Healing Power in Our Midst - A Powerful Testimony',
      ogDescription: 'Sister Mary shares her miraculous healing story that will strengthen your faith in God\'s power.'
    }
  },
  {
    id: 'family-retreat-recap',
    title: 'Family Retreat 2025: Building Stronger Bonds in Christ',
    slug: 'family-retreat-recap',
    excerpt: 'What an amazing weekend we had at our annual Family Retreat! Families came together for worship, learning, and fun activities that strengthened both family and faith bonds.',
    content: `
# Family Retreat 2025: Building Stronger Bonds in Christ

This past weekend, over 150 families gathered at the beautiful Yankari Resort for our annual Family Retreat. The theme "Together in Christ" perfectly captured the spirit of unity and love that filled our time together.

## Highlights from the Weekend

### Friday Evening: Arrival and Welcome
Families arrived throughout the evening to warm welcomes and a delicious dinner. Children immediately made new friends while parents reconnected with fellow church members.

### Saturday Morning: Family Worship
Pastor John led us in a powerful worship session focused on the importance of Christ-centered families. The children's choir blessed us with their beautiful voices.

### Saturday Afternoon: Activities Galore
- **Kids Zone:** Face painting, games, and storytelling
- **Teen Challenge:** Adventure courses and team building
- **Adult Workshops:** Marriage enrichment and parenting seminars
- **Family Olympics:** Fun competitions for all ages

### Saturday Evening: Talent Show
What a night of laughter and amazement! Families showcased their talents through music, dance, comedy, and more creative performances.

### Sunday Morning: Closing Service
We concluded with a beautiful outdoor service by the lake, with several families dedicating their homes to Christ.

## What Families Are Saying

*"This retreat reminded us why family time is so important. We're already planning to attend next year!"* - The Johnson Family

*"Our teenagers actually enjoyed spending time with us! That's a miracle in itself."* - The Williams Family

*"The marriage workshop gave us tools we'll use for years to come."* - The Okafor Family

## Key Takeaways

### 1. Family Devotions Matter
Many families committed to starting regular family devotion times after seeing the impact during our morning sessions.

### 2. Playing Together Strengthens Bonds
The family activities reminded us that fun and laughter are important elements of strong families.

### 3. Community Support is Vital
Families left with stronger connections to the church community and new support networks.

## Looking Ahead

Mark your calendars for **Family Retreat 2026** scheduled for **February 14-16, 2026**. We're already planning an even more amazing experience!

## Special Thanks

- **Retreat Planning Committee** for months of preparation
- **Youth Ministry** for organizing children's activities  
- **Hospitality Team** for managing meals and logistics
- **Worship Team** for leading us in song
- **All Volunteer Leaders** who made this retreat possible

## Photo Gallery

*Check out our [photo gallery](https://foursquareajebo.org/gallery/family-retreat-2025) for hundreds of memories from the weekend!*

---

*For more information about upcoming family events or to get involved in next year's planning, contact our Family Ministry at families@foursquareajebo.org*
    `,
    author: authors[0], // Pastor John
    category: 'family',
    tags: ['family retreat', 'families', 'children', 'marriage', 'community'],
    featuredImage: '/images/blog/family-retreat-2025.jpg',
    images: [
      '/images/blog/family-retreat-1.jpg',
      '/images/blog/family-retreat-2.jpg',
      '/images/blog/family-retreat-3.jpg',
      '/images/blog/family-retreat-4.jpg'
    ],
    publishedAt: new Date('2025-02-05T18:00:00Z'),
    updatedAt: new Date('2025-02-05T18:00:00Z'),
    status: 'published',
    featured: false,
    readTime: 5,
    views: 678,
    likes: 92,
    comments: [],
    seo: {
      metaTitle: 'Family Retreat 2025 Recap | Foursquare Ajebo',
      metaDescription: 'Read about our amazing Family Retreat 2025 where over 150 families came together for worship, learning, and fun activities.',
      keywords: ['family retreat', 'families', 'children', 'foursquare ajebo', 'retreat recap'],
      ogImage: '/images/blog/family-retreat-2025-og.jpg',
      ogTitle: 'Family Retreat 2025: Building Stronger Bonds in Christ',
      ogDescription: 'Over 150 families gathered for an amazing weekend of worship, learning, and fun activities.'
    }
  },
  {
    id: 'new-ministry-launch',
    title: 'Introducing "Compassion Hands" - Our New Community Outreach Ministry',
    slug: 'new-ministry-launch',
    excerpt: 'We are excited to launch our newest ministry focused on serving the less privileged in our community. Join us as we extend God\'s love through practical acts of service.',
    content: `
# Introducing "Compassion Hands" - Our New Community Outreach Ministry

*"For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in." - Matthew 25:35*

We are thrilled to announce the launch of **Compassion Hands**, our newest ministry dedicated to serving the less privileged in our community and beyond.

## Our Vision

To be the hands and feet of Jesus in our community by providing practical help, emotional support, and spiritual encouragement to those in need.

## Our Mission

Through organized outreach programs, we aim to:
- Feed the hungry
- Clothe the naked  
- Visit the sick and imprisoned
- Care for orphans and widows
- Provide educational support to underprivileged children
- Offer skills training for economic empowerment

## Leadership Team

**Deacon Michael Williams** - Ministry Director  
With over 10 years of experience in community development, Deacon Michael brings passion and expertise to lead this vital ministry.

**Sister Grace Adebayo** - Programs Coordinator  
Sister Grace will oversee the day-to-day operations and coordinate with partner organizations.

**Brother James Okafor** - Logistics Manager  
Brother James ensures smooth execution of all outreach activities and manages our resource distribution.

## Upcoming Programs

### February: "Love in Action" Valentine's Outreach
- **Date:** February 14, 2025
- **Location:** Ojodu Community
- **Activities:** Free medical checkups, food distribution, children's program
- **Volunteers Needed:** 50

### March: "Hope for Tomorrow" Educational Support
- **Date:** March 8, 2025  
- **Location:** Local Primary Schools
- **Activities:** School supplies distribution, reading program, teacher appreciation
- **Volunteers Needed:** 30

### April: "Skills for Life" Empowerment Program
- **Date:** April 12-13, 2025
- **Location:** Church Premises
- **Activities:** Tailoring, computer literacy, financial literacy workshops
- **Volunteers Needed:** 20

## How You Can Get Involved

### 1. Volunteer Your Time
Join us for monthly outreach activities. No special skills required - just a willing heart!

### 2. Donate Resources
We need:
- Non-perishable food items
- Clothing (new or gently used)
- Educational materials
- Medical supplies
- Financial donations

### 3. Partner with Us
If you own a business or have professional skills, consider partnering with us to expand our impact.

### 4. Pray for the Ministry
Most importantly, keep this ministry in your prayers. Pray for wisdom, resources, and open doors.

## Registration and Training

All volunteers must complete a brief orientation session covering:
- Ministry vision and values
- Safety protocols  
- Cultural sensitivity
- Child protection policies
- Team coordination

**Next Orientation Session:** February 3, 2025, 2:00 PM - 4:00 PM

## Partner Organizations

We are grateful to partner with:
- **Lagos Food Bank** - Food distribution programs
- **Bridge2Hope Foundation** - Educational initiatives  
- **Mercy Medical Outreach** - Healthcare services
- **Skills Acquisition Centre** - Vocational training

## Impact Goals for 2025

- Reach 2,000 individuals through various programs
- Distribute food to 500 families quarterly
- Provide educational support to 200 children
- Train 100 individuals in marketable skills
- Establish 3 permanent outreach locations

## Contact Information

**Ministry Email:** compassionhands@foursquareajebo.org  
**Phone:** (234) 802-345-6789  
**WhatsApp Group:** [Join our WhatsApp group](https://wa.me/2348023456789)

## Join Us Today!

Don't wait - there are people in our community who need our help right now. Together, we can make a real difference in the lives of those around us.

**"In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'" - Acts 20:35**

---

*Sign up to volunteer or for more information, visit the Compassion Hands booth in the church lobby every Sunday or contact Deacon Michael at michael@foursquareajebo.org*
    `,
    author: authors[2], // Deacon Michael
    category: 'ministry',
    tags: ['community outreach', 'ministry launch', 'volunteer', 'compassion', 'service'],
    featuredImage: '/images/blog/compassion-hands-launch.jpg',
    images: [
      '/images/blog/compassion-hands-1.jpg',
      '/images/blog/compassion-hands-2.jpg'
    ],
    publishedAt: new Date('2025-01-28T12:00:00Z'),
    updatedAt: new Date('2025-01-28T12:00:00Z'),
    status: 'published',
    featured: true,
    readTime: 7,
    views: 1100,
    likes: 134,
    comments: [],
    seo: {
      metaTitle: 'New Ministry Launch: Compassion Hands | Foursquare Ajebo',
      metaDescription: 'Join our new Compassion Hands ministry as we serve the less privileged in our community through practical acts of love and service.',
      keywords: ['ministry launch', 'community outreach', 'compassion hands', 'volunteer', 'foursquare ajebo'],
      ogImage: '/images/blog/compassion-hands-og.jpg',
      ogTitle: 'Compassion Hands Ministry - Serving Our Community',
      ogDescription: 'Be the hands and feet of Jesus in our community. Join our newest ministry focused on practical service and outreach.'
    }
  },
  {
    id: 'prayer-week-invitation',
    title: '21 Days of Prayer and Fasting: "Breakthrough 2025"',
    slug: 'prayer-week-invitation',
    excerpt: 'Join us for our annual 21 days of prayer and fasting starting March 1st. This is a time for spiritual breakthrough, personal transformation, and corporate revival.',
    content: `
# 21 Days of Prayer and Fasting: "Breakthrough 2025"

*"If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land." - 2 Chronicles 7:14*

## A Call to Consecration

We invite every member of the Foursquare Ajebo family to join us for our annual **21 Days of Prayer and Fasting** starting **March 1st, 2025**. This year's theme, "Breakthrough 2025," reflects our heart's desire to see God move powerfully in our individual lives, families, church, and nation.

## Why 21 Days?

The number 21 represents a complete spiritual cycle. It was after 21 days of prayer that Daniel received his breakthrough (Daniel 10:13). We believe that consistent, focused prayer over 21 days positions us for divine intervention and breakthrough.

## Daily Schedule

### 5:30 AM - 6:30 AM: Morning Prayer
**Location:** Church Sanctuary  
**Focus:** Corporate intercession and worship

### 12:00 PM - 12:30 PM: Midday Prayer
**Location:** Church Conference Room  
**Focus:** Quick prayers for those who can join during lunch break

### 6:00 PM - 7:00 PM: Evening Prayer
**Location:** Church Sanctuary  
**Focus:** Teaching, prayer, and ministry time

### 9:00 PM - 10:00 PM: Night Watch (Optional)
**Location:** Virtual (Zoom)  
**Focus:** Intensive intercession for special cases

## Weekly Themes

### Week 1 (March 1-7): Personal Breakthrough
- Spiritual growth and character development
- Breaking generational curses
- Personal relationship with God
- Health and healing

### Week 2 (March 8-14): Family and Relationships
- Marriage and family restoration
- Children and education
- Extended family salvation
- Relationship reconciliation

### Week 3 (March 15-21): Church and Nation
- Church growth and revival
- Leadership and vision
- National transformation
- Global missions and evangelism

## Fasting Guidelines

### Types of Fasting Available:

1. **Complete Fast** (6 AM - 6 PM daily)
   - No food or water during fasting hours
   - For mature Christians experienced in fasting

2. **Daniel Fast** (All 21 days)
   - Vegetables, fruits, and water only
   - No meat, sweets, or processed foods

3. **Partial Fast** (6 AM - 3 PM daily)
   - Modified for beginners or those with health conditions

4. **Corporate Fast** (Specific items)
   - Social media, entertainment, or specific foods
   - Focus on spiritual disciplines instead

### Medical Considerations
- Pregnant women, nursing mothers, and those with medical conditions should consult their doctors
- Alternative fasting options available for those who cannot fast food
- Children can fast specific items or activities age-appropriately

## Prayer Focus Areas

### Personal Petitions
- Spiritual growth and maturity
- Career and business breakthrough  
- Academic excellence
- Health and healing
- Financial provision

### Church Requests
- Numerical and spiritual growth
- Completion of building projects
- Leadership development
- Ministry effectiveness
- Unity and love

### National Concerns
- Government and leadership
- Economic stability
- Security and peace
- Educational system
- Healthcare improvement

### Global Missions
- Unreached people groups
- Persecuted church
- Mission work expansion
- Revival movements
- End-time harvest

## Special Events

### March 7: Mid-Fast Miracle Service
**Time:** 6:00 PM - 8:00 PM  
**Special Guest:** Archbishop David Oyedepo III  
**Focus:** Healing and miracle service

### March 14: Youth Night of Fire
**Time:** 7:00 PM - 10:00 PM  
**Target:** Ages 13-35  
**Focus:** Youth revival and consecration

### March 21: Breakthrough Celebration
**Time:** 6:00 PM - 9:00 PM  
**Activity:** Testimony service and celebration dinner  
**Focus:** Celebrating God's faithfulness

## How to Participate

### 1. Register Your Commitment
Fill out the commitment card available at the church or online at [foursquareajebo.org/21days](https://foursquareajebo.org/21days)

### 2. Get Your Prayer Guide
Pick up your detailed 21-day prayer guide from the church office or download the digital version.

### 3. Join a Prayer Group
Small groups will meet daily for accountability and encouragement.

### 4. Download the App
Our "21 Days Prayer" mobile app includes:
- Daily prayer points
- Biblical reflections
- Fasting tracker
- Live streaming of prayer sessions

## Prayer Partners and Support

### Prayer Partners
Each participant will be paired with a prayer partner for mutual encouragement and accountability.

### WhatsApp Groups
- **General Group:** Daily updates and encouragements
- **Men's Group:** Specific prayer needs for men
- **Women's Group:** Specific prayer needs for women  
- **Youth Group:** Age-appropriate content for young people

### Pastoral Support
Our pastoral team will be available for:
- Spiritual counseling
- Prayer for specific needs
- Guidance on fasting practices
- Emergency spiritual support

## Testimonials from Previous Years

*"The 21 days changed my life forever. I received a job offer on day 18 after being unemployed for 8 months!"* - Sister Ruth

*"Our marriage was restored during the family week. We're stronger than ever!"* - Mr. & Mrs. Adebayo

*"I experienced physical healing during the prayer time. The doctors confirmed I was completely healed!"* - Brother Paul

## Expected Outcomes

Based on previous years, participants often experience:
- Deeper intimacy with God
- Breakthrough in long-standing issues
- Physical and emotional healing
- Provision and open doors
- Stronger faith and prayer life
- Greater spiritual discernment

## Important Notes

- Children's programs run parallel to adult sessions
- Meals will be provided after evening prayers for those fasting
- Transportation assistance available for elderly members
- All sessions will be live-streamed for those unable to attend physically

## Contact Information

**Prayer Coordinator:** Pastor Mary Adebayo  
**Phone:** (234) 803-456-7890  
**Email:** prayer@foursquareajebo.org  
**WhatsApp:** [Join our 21 Days group](https://wa.me/2348034567890)

## Let's Believe Together!

This is our time for breakthrough! God is ready to do immeasurably more than we can ask or imagine. Join us as we seek His face together for 21 days of consecration and faith.

**"Call to me and I will answer you and tell you great and unsearchable things you do not know." - Jeremiah 33:3**

---

*Register today and let's experience God's breakthrough power together! Visit foursquareajebo.org/21days or see Pastor Mary after service.*
    `,
    author: authors[0], // Pastor John
    category: 'prayer',
    tags: ['prayer', 'fasting', '21 days', 'breakthrough', 'consecration'],
    featuredImage: '/images/blog/21-days-prayer-2025.jpg',
    images: [
      '/images/blog/prayer-fasting-1.jpg',
      '/images/blog/prayer-fasting-2.jpg'
    ],
    publishedAt: new Date('2025-02-20T09:00:00Z'),
    updatedAt: new Date('2025-02-20T09:00:00Z'),
    status: 'published',
    featured: true,
    readTime: 8,
    views: 1450,
    likes: 187,
    comments: [],
    seo: {
      metaTitle: '21 Days of Prayer and Fasting 2025 | Foursquare Ajebo',
      metaDescription: 'Join our annual 21 Days of Prayer and Fasting starting March 1st. Experience breakthrough in your personal life, family, and church.',
      keywords: ['21 days prayer', 'fasting', 'breakthrough 2025', 'prayer and fasting', 'foursquare ajebo'],
      ogImage: '/images/blog/21-days-prayer-og.jpg',
      ogTitle: '21 Days of Prayer and Fasting: Breakthrough 2025',
      ogDescription: 'Experience divine breakthrough through 21 days of consecrated prayer and fasting. Join our church family starting March 1st.'
    }
  }
];

// Helper functions
export function getBlogPosts(limit?: number): BlogPost[] {
  const published = mockBlogPosts.filter(post => post.status === 'published');
  return limit ? published.slice(0, limit) : published;
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return mockBlogPosts
    .filter(post => post.featured && post.status === 'published')
    .slice(0, limit);
}

export function getPostsByCategory(category: BlogCategory, limit?: number): BlogPost[] {
  const filtered = mockBlogPosts.filter(post => 
    post.category === category && post.status === 'published'
  );
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getPostsByAuthor(authorId: string, limit?: number): BlogPost[] {
  const filtered = mockBlogPosts.filter(post => 
    post.author.id === authorId && post.status === 'published'
  );
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return mockBlogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export function getPopularPosts(limit: number = 5): BlogPost[] {
  return mockBlogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return mockBlogPosts.filter(post => 
    post.status === 'published' && (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.author.name.toLowerCase().includes(lowercaseQuery)
    )
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.slug === slug && post.status === 'published');
}

export function getCategoryStats() {
  const stats = blogCategories.map(category => ({
    category: category.value as BlogCategory,
    count: mockBlogPosts.filter(post => 
      post.category === category.value && post.status === 'published'
    ).length,
    label: category.label,
    icon: category.icon,
    color: category.color
  }));
  
  return stats.sort((a, b) => b.count - a.count);
}

export function getBlogStats() {
  const publishedPosts = mockBlogPosts.filter(post => post.status === 'published');
  
  return {
    totalPosts: publishedPosts.length,
    totalViews: publishedPosts.reduce((sum, post) => sum + post.views, 0),
    totalComments: publishedPosts.reduce((sum, post) => sum + post.comments.length, 0),
    popularPosts: getPopularPosts(3),
    recentPosts: getRecentPosts(3),
    topCategories: getCategoryStats().slice(0, 5)
  };
}

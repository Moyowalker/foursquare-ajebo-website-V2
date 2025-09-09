import { BoardMember, BoardPageData } from '@/types/board';

export const boardMembers: BoardMember[] = [
  {
    id: '1',
    name: 'Pastor Emmanuel Adebayo',
    position: 'Chairman',
    title: 'Senior Pastor',
    department: 'Spiritual Leadership',
    bio: 'Pastor Emmanuel has been leading Foursquare Ajebo for over 15 years with unwavering dedication to God\'s word and community service. He holds a Master\'s in Theology and has planted 5 churches across Nigeria.',
    imageUrl: '/images/board/pastor-emmanuel.jpg',
    phone: '+234-800-123-4567',
    email: 'pastor.emmanuel@foursquareajebo.org',
    yearsOfService: 15,
    specialization: ['Church Planting', 'Biblical Teaching', 'Leadership Development'],
    education: 'Master of Divinity, Nigerian Baptist Theological Seminary',
    ministry: ['Pulpit Ministry', 'Evangelism', 'Church Growth'],
    joinedDate: '2009-01-15',
    isChairperson: true
  },
  {
    id: '2',
    name: 'Pastor (Mrs.) Grace Adebayo',
    position: 'Vice Chairman',
    title: 'Associate Pastor',
    department: 'Women Ministry',
    bio: 'Pastor Grace is a passionate leader in women\'s ministry and youth development. She coordinates all children and women programs, bringing over 12 years of ministry experience to Foursquare Ajebo.',
    imageUrl: '/images/board/pastor-grace.jpg',
    phone: '+234-800-123-4568',
    email: 'pastor.grace@foursquareajebo.org',
    yearsOfService: 12,
    specialization: ['Women Ministry', 'Children Development', 'Family Counseling'],
    education: 'Bachelor of Arts in Christian Education',
    ministry: ['Women Fellowship', 'Sunday School', 'Marriage Counseling'],
    joinedDate: '2012-03-20',
    isViceChairperson: true
  },
  {
    id: '3',
    name: 'Elder Adejare Johnson',
    position: 'Secretary',
    title: 'Elder',
    department: 'Administration',
    bio: 'Elder Johnson brings 20 years of corporate experience and 10 years of church leadership. He oversees church administration, financial planning, and strategic development initiatives.',
    imageUrl: '/images/board/elder-johnson.jpg',
    phone: '+234-800-123-4569',
    email: 'elder.johnson@foursquareajebo.org',
    yearsOfService: 10,
    specialization: ['Administration', 'Financial Management', 'Strategic Planning'],
    education: 'MBA in Business Administration, University of Lagos',
    ministry: ['Church Administration', 'Finance Committee', 'Strategic Planning'],
    joinedDate: '2014-06-10'
  },
  {
    id: '4',
    name: 'Deacon Olumide Bankole',
    position: 'Treasurer',
    title: 'Deacon',
    department: 'Finance',
    bio: 'Deacon Bankole is a chartered accountant with over 18 years of experience in financial management. He ensures transparency and accountability in all church financial matters.',
    imageUrl: '/images/board/deacon-bankole.jpg',
    phone: '+234-800-123-4570',
    email: 'deacon.bankole@foursquareajebo.org',
    yearsOfService: 8,
    specialization: ['Financial Accounting', 'Budget Management', 'Audit Compliance'],
    education: 'ACA, Institute of Chartered Accountants of Nigeria',
    ministry: ['Finance Committee', 'Budget Planning', 'Financial Oversight'],
    joinedDate: '2016-09-15'
  },
  {
    id: '5',
    name: 'Elder (Mrs.) Funmilayo Okafor',
    position: 'Welfare Coordinator',
    title: 'Elder',
    department: 'Welfare & Outreach',
    bio: 'Elder Funmilayo coordinates all welfare and outreach programs. She has a heart for the less privileged and has initiated several community development projects.',
    imageUrl: '/images/board/elder-funmilayo.jpg',
    phone: '+234-800-123-4571',
    email: 'elder.funmilayo@foursquareajebo.org',
    yearsOfService: 12,
    specialization: ['Community Outreach', 'Welfare Programs', 'Social Services'],
    education: 'Bachelor of Social Work, University of Ibadan',
    ministry: ['Welfare Committee', 'Community Outreach', 'Charity Programs'],
    joinedDate: '2012-11-20'
  },
  {
    id: '6',
    name: 'Deacon Chinedu Okwu',
    position: 'Youth Coordinator',
    title: 'Deacon',
    department: 'Youth Ministry',
    bio: 'Deacon Chinedu is passionate about youth development and technology integration in ministry. He leads the youth ministry and oversees all digital ministry initiatives.',
    imageUrl: '/images/board/deacon-chinedu.jpg',
    phone: '+234-800-123-4572',
    email: 'deacon.chinedu@foursquareajebo.org',
    yearsOfService: 6,
    specialization: ['Youth Ministry', 'Digital Ministry', 'Technology Integration'],
    education: 'Bachelor of Computer Science, Federal University of Technology',
    ministry: ['Youth Fellowship', 'Digital Ministry', 'Tech Committee'],
    joinedDate: '2018-04-12'
  },
  {
    id: '7',
    name: 'Elder Biodun Adesola',
    position: 'Evangelism Coordinator',
    title: 'Elder',
    department: 'Evangelism',
    bio: 'Elder Biodun leads all evangelism efforts and mission activities. He has organized over 50 evangelism crusades and has a passion for soul winning.',
    imageUrl: '/images/board/elder-biodun.jpg',
    phone: '+234-800-123-4573',
    email: 'elder.biodun@foursquareajebo.org',
    yearsOfService: 14,
    specialization: ['Evangelism', 'Mission Work', 'Crusade Organization'],
    education: 'Diploma in Theology, West Africa Theological Seminary',
    ministry: ['Evangelism Committee', 'Mission Outreach', 'Crusade Team'],
    joinedDate: '2010-08-30'
  },
  {
    id: '8',
    name: 'Deaconess Blessing Umeh',
    position: 'Children Coordinator',
    title: 'Deaconess',
    department: 'Children Ministry',
    bio: 'Deaconess Blessing oversees all children programs and Sunday school activities. She has a special gift for working with children and training teachers.',
    imageUrl: '/images/board/deaconess-blessing.jpg',
    phone: '+234-800-123-4574',
    email: 'deaconess.blessing@foursquareajebo.org',
    yearsOfService: 9,
    specialization: ['Children Ministry', 'Sunday School', 'Teacher Training'],
    education: 'Bachelor of Education, University of Nigeria, Nsukka',
    ministry: ['Children Church', 'Sunday School', 'Teacher Development'],
    joinedDate: '2015-02-14'
  },
  {
    id: '9',
    name: 'Elder Tunde Fashola',
    position: 'Protocol Coordinator',
    title: 'Elder',
    department: 'Protocol & Events',
    bio: 'Elder Tunde coordinates all church events and protocol activities. He ensures orderly conduct of services and proper organization of special programs.',
    imageUrl: '/images/board/elder-tunde.jpg',
    phone: '+234-800-123-4575',
    email: 'elder.tunde@foursquareajebo.org',
    yearsOfService: 11,
    specialization: ['Event Management', 'Protocol Coordination', 'Service Organization'],
    education: 'Bachelor of Arts in Mass Communication',
    ministry: ['Protocol Committee', 'Event Planning', 'Service Coordination'],
    joinedDate: '2013-07-05'
  },
  {
    id: '10',
    name: 'Deacon Ibrahim Suleiman',
    position: 'Security Coordinator',
    title: 'Deacon',
    department: 'Security & Safety',
    bio: 'Deacon Ibrahim oversees church security and safety measures. With a background in security management, he ensures the safety of all church members and visitors.',
    imageUrl: '/images/board/deacon-ibrahim.jpg',
    phone: '+234-800-123-4576',
    email: 'deacon.ibrahim@foursquareajebo.org',
    yearsOfService: 7,
    specialization: ['Security Management', 'Safety Protocols', 'Emergency Response'],
    education: 'Certificate in Security Management',
    ministry: ['Security Committee', 'Safety Team', 'Ushering Department'],
    joinedDate: '2017-01-18'
  },
  {
    id: '11',
    name: 'Elder (Mrs.) Patience Nwosu',
    position: 'Music Coordinator',
    title: 'Elder',
    department: 'Music Ministry',
    bio: 'Elder Patience leads the music ministry and choir coordination. She has over 15 years of experience in music ministry and has trained numerous church musicians.',
    imageUrl: '/images/board/elder-patience.jpg',
    phone: '+234-800-123-4577',
    email: 'elder.patience@foursquareajebo.org',
    yearsOfService: 13,
    specialization: ['Music Ministry', 'Choir Direction', 'Worship Leading'],
    education: 'Certificate in Music, Lagos State University',
    ministry: ['Choir Ministry', 'Music Training', 'Worship Team'],
    joinedDate: '2011-05-22'
  },
  {
    id: '12',
    name: 'Deacon Samuel Ogundimu',
    position: 'Media Coordinator',
    title: 'Deacon',
    department: 'Media & Communications',
    bio: 'Deacon Samuel manages all media and communication activities. He oversees live streaming, recording, and all digital communication platforms of the church.',
    imageUrl: '/images/board/deacon-samuel.jpg',
    phone: '+234-800-123-4578',
    email: 'deacon.samuel@foursquareajebo.org',
    yearsOfService: 5,
    specialization: ['Media Production', 'Digital Communications', 'Live Streaming'],
    education: 'Bachelor of Mass Communication, Covenant University',
    ministry: ['Media Team', 'Communications', 'Technical Support'],
    joinedDate: '2019-10-08'
  }
];

export const boardPageData: BoardPageData = {
  hero: {
    title: 'Board of Trustees',
    subtitle: 'Dedicated Leadership Serving God\'s People',
    description: 'Meet our committed board members who provide spiritual guidance, strategic direction, and administrative oversight to advance God\'s kingdom through Foursquare Gospel Church Ajebo.'
  },
  sections: [
    {
      title: 'Executive Leadership',
      description: 'Our senior leadership team providing strategic direction and spiritual oversight',
      members: boardMembers.filter(member => 
        member.isChairperson || member.isViceChairperson || member.position === 'Secretary' || member.position === 'Treasurer'
      )
    },
    {
      title: 'Ministry Coordinators',
      description: 'Dedicated leaders overseeing specific ministry areas and departments',
      members: boardMembers.filter(member => 
        !member.isChairperson && !member.isViceChairperson && 
        member.position !== 'Secretary' && member.position !== 'Treasurer'
      )
    }
  ],
  totalMembers: boardMembers.length
};

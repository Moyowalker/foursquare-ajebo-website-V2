export interface BoardMember {
  id: string;
  name: string;
  position: string;
  title: string; // Pastor, Elder, Deacon, etc.
  department?: string;
  bio: string;
  imageUrl: string;
  phone?: string;
  email?: string;
  yearsOfService: number;
  specialization?: string[];
  education?: string;
  ministry?: string[];
  joinedDate: string;
  isChairperson?: boolean;
  isViceChairperson?: boolean;
}

export interface BoardSection {
  title: string;
  description: string;
  members: BoardMember[];
}

export interface BoardPageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  sections: BoardSection[];
  totalMembers: number;
}

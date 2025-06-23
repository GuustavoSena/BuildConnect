import type { Post } from './Post';

export interface ProfessionalProfile {
  id: number;
  name: string;
  city: string;
  profilePhoto: string | null;
  backgroundPhoto: string | null;
  averageRating: number;
  posts: Post[];
}
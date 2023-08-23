import { Question } from "@models";

export interface Game {
  id: number;
  title: string;
  slug: string;
  level: number;
  details?: string;
  type: string;
  image?: string;
  coverImage?: string;
  color: string;
  hashTags?: string;
  isTimeBound: number;
  startDate: string;
  endDate?: string;
  status: number;

  question: Array<Question>;
  created_at?: string;
  updated_at?: string;
}

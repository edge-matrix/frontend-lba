import { Options, Answer } from "@models";

export interface Question {
  id: number;
  quiz_id: number;
  question: string;
  points: number;
  type: string;
  status: number;

  options: Array<Options>;
  answer: Answer;
  created_at?: string;
  updated_at?: string;
}

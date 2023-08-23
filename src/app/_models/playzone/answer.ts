export interface Answer {
  id: number;
  quiz_question_id: number;
  participants_id?: number;
  quiz_option_id: number;
  created_at?: string;
  updated_at?: string;
}

import {QuestionAnswer} from "./question-answer";

export interface Question {
  id: number;
  questionText: string;
  questionType: string;
  questionStructure?: string;
  structureId: number;
  comment?: string;
  answers: QuestionAnswer[];
}

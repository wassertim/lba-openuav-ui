import {QuestionAnswer} from "./question-answer";
import {QuestionStructure} from "./question-structure";

export interface Question {
  id: number;
  text: string;
  questionType: string;
  structure?: QuestionStructure;
  answers: QuestionAnswer[];
}

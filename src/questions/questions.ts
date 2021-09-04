import {Question} from "./model/question";

const serviceUrl = 'http://127.0.0.1:4010/questions';

export async function fetchAllQuestions(): Promise<Question[]> {
  return await fetch(serviceUrl).then(r => r.json() as Promise<Question[]>);
}

export async function fetchQuestionById(id: number): Promise<Question> {
  return await fetch(`${serviceUrl}/one/${id}`).then(r => r.json() as Promise<Question>);
}

export async function getNextUnansweredQuestion(): Promise<Question> {
  return await fetch(`${serviceUrl}/one?type=FIRST_UNANSWERED`).then(r => r.json() as Promise<Question>);
}

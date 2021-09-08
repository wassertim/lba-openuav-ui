import {Question} from '../model/question';
import {AnswerPayload} from '../model/answer-payload';

const serviceUrl = 'http://127.0.0.1:9090/questions';

export async function fetchAllQuestions(): Promise<Question[]> {
  return await fetch(serviceUrl).then(r => r.json() as Promise<Question[]>);
}

export async function fetchQuestionById(id: number): Promise<Question> {
  return await fetch(`${serviceUrl}/one/${id}`)
      .then(r => r.json() as Promise<Question>)
      .then(question => {
        if (!question.comment) {
          question.comment = '';
        }
        question.answers.forEach((a) => {
          if (!a.guessedAsCorrect) {
            a.guessedAsCorrect = false;
          }
        });

        return question;
      });
}

export async function getNextUnansweredQuestion(): Promise<Question> {
  return await fetch(`${serviceUrl}/one?type=FIRST_UNANSWERED`).then(r => r.json() as Promise<Question>);
}

export function setAnswer(questionId: number, answerPayload: AnswerPayload) {
  return fetch(`${serviceUrl}/one/${questionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answerPayload)
  });
}

import {Question} from '../model/question';
import {AnswerPayload} from '../model/answer-payload';

const serviceUrl = 'http://127.0.0.1:9090/questions';

export async function fetchAllQuestions(type: string = "ALL"): Promise<Question[]> {
  return await fetch(`${serviceUrl}?type=${type}`).then(r => r.json() as Promise<Question[]>);
}

function mapQustion(question: Question) {
  if (!question.comment) {
    question.comment = '';
  }
  if (!question.url) {
    question.url = '';
  }
  question.answers.forEach((a) => {
    if (!a.guessedAsCorrect) {
      a.guessedAsCorrect = false;
    }
  });

  return question;
}

export async function fetchQuestionById(id: number): Promise<Question> {
  return mapQustion(
      await fetch(`${serviceUrl}/one/${id}`)
          .then(r => r.json() as Promise<Question>)
  );
}

export async function getNextUnansweredQuestion(): Promise<Question> {
  return mapQustion(
      await fetch(`${serviceUrl}/one?type=FIRST_UNANSWERED`)
          .then(r => r.json() as Promise<Question>)
  );
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

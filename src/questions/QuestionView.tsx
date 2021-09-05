import {useEffect, useState} from "react";
import {fetchQuestionById, getNextUnansweredQuestion, setAnswer} from './fetch/questions';
import {Question} from './model/question';
import {useParams} from 'react-router-dom';
import {QuestionParams} from './model/question-params';
import {inputsHandler} from '../util/input-handler';

export function QuestionView() {
  const [question, setQuestion] = useState({} as Question);
  const [selectedAnswer, setSelectedAnswer] = useState({answerId: undefined} as Record<string, number | undefined>);
  let {questionId} = useParams<QuestionParams>();

  const initialize = (question: Question) => {
    const answer = question.answers.find(a => a.guessedAsCorrect);
    setQuestion(question);
    setSelectedAnswer({answerId: answer?.id});

    return question;
  };

  useEffect(() => {
    (async () => {
      initialize(await fetchQuestionById(+questionId));
    })();
  }, [questionId]);
  const goToNextQuestion = (e: any) => {
    (async () => {
      e.preventDefault();
      if (!selectedAnswer['answerId']) {
        return console.error('answer is not selected');
      }
      await setAnswer(+questionId, +selectedAnswer['answerId']);
      const question = initialize(await getNextUnansweredQuestion());
      window.history.replaceState(null, "New Page Title", `/questions/${question.id}`);
    })();
  }

  return (
      <div className="card text-dark bg-light mt-4">
        <div className="card-header">Question #{question.id}</div>
        <div className="card-body">
          <p className="card-text">
            {question.text}
          </p>
          <form onSubmit={goToNextQuestion}>
            <ul className="list-group list-group-flush">
              {question.answers && question.answers.map((qa, index) =>
                  <li key={index} className="list-group-item">
                    <div className="form-check">
                      <input
                          id={`answer-${index}`}
                          type="radio"
                          className="form-check-input"
                          value={qa.id}
                          checked={selectedAnswer.answerId === qa.id}
                          name="answerId"
                          onChange={(e) => inputsHandler(e, setSelectedAnswer)}
                      />
                      <label htmlFor={`answer-${index}`} className="form-check-label">{qa.text}</label>
                    </div>
                  </li>
              )}
            </ul>
            <button className="card-link btn-link btn mt-3" type="submit">
              Next Question
            </button>
          </form>
        </div>
      </div>
  )
}

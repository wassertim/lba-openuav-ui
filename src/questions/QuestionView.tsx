import {useEffect, useState} from "react";
import {fetchQuestionById, getNextUnansweredQuestion, setAnswer} from './questions';
import {Question} from './model/question';
import {useParams} from "react-router-dom";
import {QuestionParams} from "./model/question-params";

export function QuestionView() {
  const [question, setQuestion] = useState({} as Question);
  const [selectedAnswer, setSelectedAnswer] = useState({answerId: ""} as Record<string, string>);
  let {questionId} = useParams<QuestionParams>();

  useEffect(() => {
    (async () => {
      let q = await fetchQuestionById(+questionId);
      console.log('question', q);
      setQuestion(q);
    })();
  }, [questionId]);
  const goToNextQuestion = (e: any) => {
    e.preventDefault();
    (async () => {
      await setAnswer(question.id, +selectedAnswer['answerId']);
      let q = await getNextUnansweredQuestion();
      window.history.replaceState(null, "New Page Title", `/questions/${q.id}`);
      setQuestion(q);
    })();
  }
  const inputsHandler = (e: any) => {
    setSelectedAnswer({[(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value});
  }
  return (
      <div className="card text-dark bg-light mt-3">
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
                          name="answerId"
                          onChange={inputsHandler}
                      />
                      <label htmlFor={`answer-${index}`} className="form-check-label">{qa.text}</label>
                    </div>
                  </li>
              )}
            </ul>
            <button className="card-link btn-link btn" type="submit">
              Next Question
            </button>
          </form>
        </div>
      </div>
  )
}

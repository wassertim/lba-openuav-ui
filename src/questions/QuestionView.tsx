import {useEffect, useState} from "react";
import {fetchQuestionById, getNextUnansweredQuestion} from './questions';
import {Question} from './model/question';
import {useParams} from "react-router-dom";
import {QuestionParams} from "./model/question-params";

export function QuestionView() {
  const [question, setQuestion] = useState({} as Question);
  let {questionId} = useParams<QuestionParams>();

  useEffect(() => {(async () => {
    let q = await fetchQuestionById(+questionId);
    console.log('question', q);
    setQuestion(q);
  })();}, [questionId]);
  const goToNextQuestion = () => {(async () => {
    let q = await getNextUnansweredQuestion();
    window.history.replaceState(null, "New Page Title", `/questions/${q.id}`);
    setQuestion(q);
  })();}
  return (
      <div className="card text-dark bg-light mt-3">
        <div className="card-header">Question #{question.id}</div>
        <div className="card-body">
          <p className="card-text">
            {question.text}
          </p>
          <ul className="list-group list-group-flush">
            {question.answers && question.answers.map((qa, index) =>
              <li key={index} className="list-group-item">{qa.text}</li>
            )}
          </ul>
          <button className="card-link btn-link btn" onClick={goToNextQuestion}>Next Question</button>
        </div>
      </div>
  )
}

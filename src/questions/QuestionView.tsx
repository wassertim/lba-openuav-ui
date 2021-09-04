import {useEffect, useState} from "react";
import {fetchQuestionById} from './questions';
import {Question} from './model/question';
import {useParams} from "react-router-dom";

type QuestionParams = {
  questionId: string;
};

export function QuestionView() {
  const [question, setQuestion] = useState({} as Question);
  let {questionId} = useParams<QuestionParams>();

  useEffect(() => {
    (async () => {
      let q = await fetchQuestionById(+questionId);
      console.log('question', q);
      setQuestion(q);
    })();
  }, [questionId]);
  return (
      <div className="card text-dark bg-light mt-3">
        <div className="card-header">Question #{question.id}</div>
        <div className="card-body">
          <p className="card-text">
            {question.text}
          </p>
          <ul className="list-group list-group-flush">
            {question.answers && question.answers.map(qa =>
              <li className="list-group-item">{qa.text}</li>
            )}
          </ul>
          <a href="#" className="card-link">Prev Question</a>
          <a href="#" className="card-link">Next Question</a>
        </div>
      </div>
  )
}

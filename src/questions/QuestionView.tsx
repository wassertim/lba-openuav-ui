import {useEffect, useState} from "react";
import {fetchQuestionById, getNextUnansweredQuestion, setAnswer} from './fetch/questions';
import {Question} from './model/question';
import {useParams, useHistory} from 'react-router-dom';
import {QuestionParams} from './model/question-params';
import {inputsHandler} from '../util/input-handler';
import {AnswerState} from "./model/answer-payload";

export function QuestionView() {
  const [question, setQuestion] = useState({} as Question);
  const [state, setState] = useState({answerId: '', comment: ''} as AnswerState)
  let {questionId} = useParams<QuestionParams>();
  const history = useHistory();

  const initialize = (question: Question) => {
    const answer = question.answers.find(a => a.guessedAsCorrect);
    console.log('new question', question);
    setQuestion(question);
    setState({answerId: answer?.id + '', comment: question.comment});

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
      if (!state['answerId'] || !state['comment']) {
        console.error('comment or answerId is null');
        return;
      }
      let payload = {
        answerId: +state['answerId'],
        comment: state['comment']
      };
      console.log('payload', payload);
      await setAnswer(question.id, payload);
      setState({answerId: '', comment: ''});
      // const nextQuestion = await getNextUnansweredQuestion();
      const nextQuestion = initialize(await getNextUnansweredQuestion());
      history.push(`/questions/${nextQuestion.id}`);
    })();
  }

  return (
      <div className="card text-dark bg-light mt-4">
        <div className="card-header">{question.questionStructure}</div>
        <div className="card-body">
          <h4 className="mb-3">Question #{question.id}</h4>
          <h6 className="mb-3" style={{whiteSpace: "pre-wrap"}}>{question.questionText}</h6>
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
                          checked={state.answerId === qa.id + ''}
                          name="answerId"
                          onChange={(e) => inputsHandler(e, state, setState)}
                      />
                      <label htmlFor={`answer-${index}`} className="form-check-label">{qa.text}</label>
                    </div>
                  </li>
              )}
            </ul>
            <div className="mt-3">
              <label htmlFor="comment" className="form-check-label">Comment</label>
              <textarea
                  className="form-control"
                  name="comment"
                  value={state.comment}
                  id="comment"
                  onChange={(e) => inputsHandler(e, state, setState)}
              />
            </div>
            <button className="card-link btn-link btn mt-3" type="submit">
              Next Question
            </button>
          </form>
        </div>
      </div>
  )
}

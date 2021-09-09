import {useEffect, useState} from "react";
import {fetchAllQuestions, fetchQuestionById, getNextUnansweredQuestion, setAnswer} from './fetch/questions';
import {Question} from './model/question';
import {useHistory, useParams} from 'react-router-dom';
import {QuestionParams} from './model/question-params';
import {inputsHandler} from '../util/input-handler';
import {AnswerState} from "./model/answer-payload";

function getEmptyState() {
  return {answerId: '', comment: '', url: ''} as AnswerState;
}

export function QuestionView() {
  const [questionState, setQuestionState] = useState<Question>({
    comment: '',
    url: '',
    id: 0,
    questionStructure: '',
    questionText: '',
    questionType: '',
    answers: [],
    structureId: 0
  });
  const [state, setState] = useState(getEmptyState());
  const [questionsLeft, setQuestionsLeft] = useState(0);
  let {questionId} = useParams<QuestionParams>();
  const history = useHistory();

  const initialize = async (question: Question) => {
    setQuestionState(question);
    const answer = question.answers.find(a => a.guessedAsCorrect);
    setQuestionsLeft((await fetchAllQuestions("ALL_UNANSWERED")).length);
    setState({answerId: answer?.id + '', comment: question.comment, url: question.url});

    return question;
  };

  useEffect(() => {
    (async () => {
      await initialize(await fetchQuestionById(+questionId));
    })();
  }, [questionId]);
  const putAnswer = async () => {
    const {answerId, comment, url} = state;
    if (!answerId || !comment || !url) {
      return console.error('comment or answerId or url is null');
    }
    let payload = {answerId: +answerId, comment, url};
    await setAnswer(questionState.id, payload);
  }
  const goToNextQuestion = (e: any) => {
    (async () => {
      e.preventDefault();
      await putAnswer();
      const nextQuestion = await initialize(await getNextUnansweredQuestion());
      history.push(`/questions/${nextQuestion.id}`);
      setState(getEmptyState());
    })();
  }
  const saveQuestion = (e: any) => {
    (async () => {
      e.preventDefault();
      await putAnswer();
    })();
  }

  return (
      <div className="card text-dark bg-light mt-4">
        <div className="card-header">{questionState.questionStructure}</div>
        <div className="card-body">
          <h4 className="mb-3">Question #{questionState.id} (Left: {questionsLeft})</h4>
          <h6 className="mb-3" style={{whiteSpace: "pre-wrap"}}>{questionState.questionText}</h6>

            <ul className="list-group list-group-flush">
              {questionState.answers.map((qa, index) =>
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
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                  className="form-control"
                  name="comment"
                  value={state.comment}
                  id="comment"
                  rows={5}
                  onChange={(e) => inputsHandler(e, state, setState)}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="url" className="form-label">Reference URL</label>
              <input
                  className="form-control"
                  type="text"
                  name="url"
                  value={state.url}
                  id="url"
                  onChange={(e) => inputsHandler(e, state, setState)}
              />
            </div>
            <button className="card-link btn-link btn mt-3" type="submit" onClick={goToNextQuestion}>
              Save and Next Question
            </button>
            <button className="card-link btn-link btn mt-3" type="submit" onClick={saveQuestion}>
              Save Question
            </button>

        </div>
      </div>
  )
}

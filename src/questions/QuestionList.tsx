import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {fetchAllQuestions} from './fetch/questions';
import {Question} from './model/question';

export function QuestionList() {
  const [questions, setQuestions] = useState({} as Record<string, Question>);

  useEffect(() => {
    (async () => {
      let questionList = await fetchAllQuestions();
      const questionMap = questionList.reduce((qm, question) => {
        qm[question.questionStructure] = question;
        return {...qm, [question.questionStructure]: question};
      }, {} as Record<string, Question>);
      setQuestions(questionMap);

    })();
  }, []);
  return (
      <>
        <h1>Question List</h1>
        {
          Object.keys(questions).sort().map((questionStructure) => {
            let question = questions[questionStructure];
            return (
                <div key={questionStructure} className="alert alert-info">
                  <Link
                      to={`/questions/${question.id.toString()}`}>{questionStructure}</Link>
                </div>
            );
          })
        }
      </>
  )
}

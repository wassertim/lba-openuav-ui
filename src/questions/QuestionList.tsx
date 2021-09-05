import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {fetchAllQuestions} from './fetch/questions';
import {Question} from './model/question';

export function QuestionList() {
  const [questions, setQuestions] = useState([] as Question[]);

  useEffect(() => {
    (async () => {
      setQuestions(await fetchAllQuestions());
    })();
  }, []);
  return (
      <>
        <h1>Question List</h1>
        {
          questions.map((question, index) => (
              <div key={index}>
                <Link to={`/questions/${question.id.toString()}`}>{question.text}</Link>
              </div>
          ))
        }
      </>
  )
}

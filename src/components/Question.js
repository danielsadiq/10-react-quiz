import Options from "./options";
function Question({ question, dispatch, answer, length }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options
                question={question}
                dispatch={dispatch}
                answer={answer}
                length={length}
            />
            {/* {answer!==null && <button className="btn btn-ui" onClick={() => dispatch({type:"nextQuestion"})}>Next</button>} */}
        </div>
    );
}

export default Question;

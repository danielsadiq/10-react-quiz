function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            {/* <h3>{numQuestions} questions to test Your React Mastery</h3> */}
            <h3>Questions to test Your React Mastery</h3>
            <h4>Select your number of questions</h4>
            <div className="btn-div">
                <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "start" })}
                >
                    Let's start!
                </button>
                <select defaultValue={15} className="btn-ui" onChange={(e) => {
                    console.log(e.target.value);
                    dispatch({type:"setQuestions", payload:e.target.value})}}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15} >15</option>
                </select>
                <select className="btn-ui">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Difficult</option>
                </select>
                
            </div>
        </div>
    );
}

export default StartScreen;

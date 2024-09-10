function FinishScreen({ dispatch, points, maxPoints, highScore }) {
    const perc = (points / maxPoints) * 100;
    if (points > highScore) {
        localStorage.setItem("highScore", points);
    }
    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPoints} (
                {Math.ceil(perc)}%)
            </p>
            <p className="highscore">
                Highscore: {points > highScore ? points : highScore} points
            </p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart quiz
            </button>
        </>
    );
}

export default FinishScreen;

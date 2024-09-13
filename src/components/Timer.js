import { useEffect } from "react";
function Timer({ secondsRemaining, dispatch }) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(
        function () {
            const timer = setInterval(function () {
                dispatch({ type: "timer" });
            }, 1000);
            return () => clearInterval(timer);
        },
        [dispatch]
    );

    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}
        </div>
    );
}

export default Timer;

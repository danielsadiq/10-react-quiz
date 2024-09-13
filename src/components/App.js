import Main from "./Main";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
    questionsBank: [],
    questions: [],
    // loading, 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
    numOfQuestion : 15,
};
const SECS_PER_QUESTION = 30;

function getRandomElements(array, count) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray.slice(0, count);
}

function reducer(state, action) {
    const { questions, index, numOfQuestion, questionsBank } = state;

    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready", questionsBank:action.payload };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: numOfQuestion * SECS_PER_QUESTION,
                questions: getRandomElements(questionsBank, numOfQuestion)
            };
        case "newAnswer":
            return {
                ...state,
                answer: action.payload,
                points: action.correct
                    ? state.points + questions[index].points
                    : state.points,
            };
        case "nextQuestion":
            return { ...state, answer: null, index: index + 1 };
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore:
                    state.points > state.highScore
                        ? state.points
                        : state.highScore,
            };
        case "restart":
            return { ...initialState, questionsBank, status: "ready", questions };
        case "timer":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? "finished" : state.status,
            };

        // return {state, secondsRemaining:state.secondsRemaining-1}
        case "setQuestions":
            return { ...state, numOfQuestion: action.payload };

        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [
        { questions, status, index, answer, points, secondsRemaining },
        dispatch,
    ] = useReducer(reducer, initialState);
    const highScore = localStorage.getItem("highScore");

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((a, b) => a + Number(b.points), 0);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        dispatch={dispatch}
                        numQuestions={numQuestions}
                    />
                )}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                secondsRemaining={secondsRemaining}
                                dispatch={dispatch}
                            />
                            <NextQuestion
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        dispatch={dispatch}
                        maxPoints={maxPoints}
                        points={points}
                        highScore={highScore}
                    />
                )}
            </Main>
        </div>
    );
}

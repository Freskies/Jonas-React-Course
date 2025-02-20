import { useQuestions } from "./custom-hooks/useQuestions.js";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import Button from "./components/Button.jsx";
import Progress from "./components/Progress.jsx";
import FinishScreen from "./components/FinishScreen.jsx";
import Timer from "./components/Timer.jsx";

function App () {
	const [{ status, questions, index, answer, points, highScore, remainingSeconds }, dispatch] =
		useReducer(reducer, initialState);
	useQuestions(dispatch);

	const isLoading = status === "loading";
	const isError = status === "error";
	const isReady = status === "ready";
	const isActive = status === "active";
	const isFinished = status === "finished";

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((acc, { points }) => acc + points, 0);

	const isAnswered = answer !== null;
	const isLastQuestion = numQuestions - 1 === index;

	const buttonNextText = isLastQuestion ? "Finish" : "Next";
	const buttonNextAction = isLastQuestion
		? () => dispatch({ type: "finish" })
		: () => dispatch({ type: "nextQuestion" });

	const buttonRestartQuizAction = () => dispatch({ type: "restartQuiz" });

	return <>
		<Header/>
		<Main>
			{isLoading && <Loader/>}
			{isError && <Error/>}
			{isReady && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
			{isActive && <>
				<Progress
					index={index}
					numQuestions={numQuestions}
					points={points}
					maxPossiblePoints={maxPossiblePoints}
					isAnswered={isAnswered}
				/>
				<Question
					question={questions[index]}
					answer={answer} isAnswered={isAnswered}
					dispatch={dispatch}
				/>
				<footer>
					<Timer dispatch={dispatch} remainingSeconds={remainingSeconds}></Timer>
					{isAnswered && <Button action={buttonNextAction}>{buttonNextText}</Button>}
				</footer>
			</>}
			{isFinished && <>
				<FinishScreen
					points={points}
					maxPossiblePoints={maxPossiblePoints}
					highScore={highScore}
				/>
				<Button action={buttonRestartQuizAction}>Restart Quiz!</Button>
			</>}
		</Main>
	</>;
}

export default App;

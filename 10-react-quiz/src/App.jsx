import { useQuestions } from "./custom-hooks/useQuestions.js";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";

function App () {
	const [{ status, questions, index, answer, points }, dispatch] = useReducer(reducer, initialState);
	useQuestions(dispatch);

	const isLoading = status === "loading";
	const isError = status === "error";
	const isReady = status === "ready";
	const isActive = status === "active";

	const numQuestions = questions.length;

	return <>
		<Header/>
		<Main>
			{isLoading && <Loader/>}
			{isError && <Error/>}
			{isReady && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
			{isActive && <Question question={questions[index]} answer={answer} dispatch={dispatch}/>}
		</Main>
	</>;
}

export default App;

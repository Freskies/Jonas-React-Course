const SECONDS_PER_QUESTION = 10;

export const initialState = {
	status: "loading", // loading, error, ready, active, finished
	questions: [],
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	remainingSeconds: null,
};

export function reducer (state, { type, payload }) {
	switch (type) {
		case "dataReceived":
			return {
				...state,
				questions: payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start": {
			const { questions } = state;
			return {
				...state,
				status: "active",
				remainingSeconds: questions.length * SECONDS_PER_QUESTION,
			};
		}
		case "newAnswer": {
			const { points: currentPoints } = state;
			const { correctOption, points } = state.questions.at(state.index);
			const isCorrect = correctOption === payload;
			return {
				...state,
				answer: payload,
				points: isCorrect ? currentPoints + points : currentPoints,
			};
		}
		case "nextQuestion": {
			const { index: currentIndex } = state;
			return {
				...state,
				index: currentIndex + 1,
				answer: null,
			};
		}
		case "finish": {
			const { points, highScore } = state;
			return {
				...state,
				status: "finished",
				highScore: points > highScore ? points : highScore,
			};
		}
		case "restartQuiz": {
			const { questions } = state;
			return {
				...initialState,
				questions,
				status: "ready",
			};
		}
		case "setRemainingSeconds":
			return {
				...state,
				remainingSeconds: payload,
			};
		default:
			throw new Error("Unknown action type");
	}
}
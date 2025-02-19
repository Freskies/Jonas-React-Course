export const initialState = {
	status: "loading", // loading, error, ready, active, finished
	questions: [],
	index: 0,
	answer: null,
	points: 0,
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
		case "start":
			return {
				...state,
				status: "active",
			};
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
		default:
			throw new Error("Unknown action type");
	}
}
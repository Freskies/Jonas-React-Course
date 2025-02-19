import { useFetch } from "./useFetch.js";
import { useEffect } from "react";

export function useQuestions (dispatch) {
	const { data: questions, isLoading, error } = useFetch("http://localhost:8000/questions");

	useEffect(() => {
		if (isLoading) return;
		if (error) dispatch({ type: "dataFailed", payload: error });
		else if (questions) dispatch({ type: "dataReceived", payload: questions });
	}, [dispatch, questions, isLoading, error]);

}
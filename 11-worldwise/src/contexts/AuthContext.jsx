import { useEffect, useReducer } from "react";
import { AuthContext } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
	user: null,
	isAuthenticated: false,
};

function reducer (state, { type, payload }) {
	switch (type) {
		case "login":
			return { ...state, user: payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown action type");
	}
}

export function AuthProvider ({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	function login (email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "login", payload: FAKE_USER });
	}

	function logout () {
		dispatch({ type: "logout" });
	}

	return <AuthContext.Provider value={{
		user,
		isAuthenticated,
		login,
		logout,
	}}>
		{children}
	</AuthContext.Provider>;
}
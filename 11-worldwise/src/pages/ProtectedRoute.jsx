import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute ({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) return;
		navigate("/");
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
};
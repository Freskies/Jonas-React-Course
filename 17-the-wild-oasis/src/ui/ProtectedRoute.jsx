import { useUser } from "../features/authentication/useUser.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: grid;
	place-content: center;
`;

function ProtectedRoute ({ children }) {
	const navigate = useNavigate();
	const { isPending, isAuthenticated } = useUser();

	useEffect(() => {
		if (isPending) return;
		if (!isAuthenticated) navigate("/login");
	}, [isAuthenticated, isPending, navigate]);

	if (isPending) return <FullPage><Spinner/></FullPage>;
	if (isAuthenticated) return children;
	else return null;
}

export default ProtectedRoute;
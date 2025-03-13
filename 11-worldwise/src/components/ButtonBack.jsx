import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

export default function ButtonBack () {
	const navigate = useNavigate();

	function handleBack (e) {
		e.preventDefault();
		navigate(-1);
	}

	return <Button type="back" onClick={handleBack}>&larr; Back</Button>;
};
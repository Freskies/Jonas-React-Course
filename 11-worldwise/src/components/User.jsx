import styles from "./User.module.css";
import useAuth from "../hooks/useAuth.js";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

export default function User () {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	function handleClick () {
		logout();
		navigate("/");
	}

	return <div className={styles.user}>
		<img src={user.avatar} alt={user.name}/>
		<span>Welcome, {user.name}</span>
		<Button type="primary" onClick={handleClick}>Logout</Button>
	</div>;
};
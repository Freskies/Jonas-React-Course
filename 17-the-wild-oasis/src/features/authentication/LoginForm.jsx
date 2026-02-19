import { useState } from "react";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import { useLogin } from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LoginForm () {
	const [email, setEmail] = useState("portasfiga1099@gmail.com");
	const [password, setPassword] = useState("violaèilcoloredellaciola");
	const { login, isLoggingIn } = useLogin();

	async function handleSubmit (e) {
		e.preventDefault();
		if (isLoggingIn) return;
		if (!email || !password) return;
		login({ email, password }, {
			onSettled: () => {
				setEmail("");
				setPassword("");
			}
		});
	}

	return <Form onSubmit={handleSubmit}>
		<FormRowVertical label="Email address">
			<Input
				type="email"
				id="email"
				// This makes this form better for password managers
				autoComplete="username"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				disabled={isLoggingIn}
			/>
		</FormRowVertical>
		<FormRowVertical label="Password">
			<Input
				type="password"
				id="password"
				autoComplete="current-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				disabled={isLoggingIn}
			/>
		</FormRowVertical>
		<FormRowVertical>
			<Button size="large" disabled={isLoggingIn}>
				{isLoggingIn ? <SpinnerMini/> : "Login"}
			</Button>
		</FormRowVertical>
	</Form>;
}

export default LoginForm;

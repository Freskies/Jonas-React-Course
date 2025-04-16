import { useState } from "react";
import Button from "../../ui/Button.jsx";
import { Form } from "react-router-dom";

function CreateUser () {
	const [username, setUsername] = useState("");

	return <Form method="PATCH">
		<p className={`mb-4 text-sm text-stone-600 md:text-base`}>
			👋 Welcome! Please start by telling us your name:
		</p>

		<input
			type="text"
			placeholder="Your full name"
			name="username"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			className={`input mb-8 w-72 bg-white`}
		/>

		{username !== "" && <div>
			<Button type="primary">Start ordering</Button>
		</div>}
	</Form>;
}

export default CreateUser;

import Button from "./Button.jsx";
import { useState } from "react";

export default function FormAddFriend ({ onAddFriend }) {
	const [displayForm, setDisplayForm] = useState(false);
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleToggleForm () {
		setDisplayForm((displayForm) => !displayForm);
	}

	function handleSubmit (e) {
		e.preventDefault();
		if (!name || !image) return;

		const id = crypto.randomUUID();
		const newFriend = { name, image: `${image}?${id}`, balance: 0, id };

		onAddFriend(newFriend);
		setDisplayForm(false);

		setName("");
		setImage("https://i.pravatar.cc/48");
	}

	return <>
		{displayForm &&
			<form className="form-add-friend" onSubmit={handleSubmit}>
				<label htmlFor="1">👪 Friend name</label>
				<input type="text" id="1" value={name} onChange={e => setName(e.target.value)}/>

				<label htmlFor="2">🖼️ Image URL</label>
				<input type="text" id="2" value={image} onChange={e => setImage(e.target.value)}/>

				<Button>Add</Button>
			</form>
		}

		<Button onClick={handleToggleForm}>{displayForm ? "Close" : "Add Friend"}</Button>
	</>;
}
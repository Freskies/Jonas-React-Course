import Button from "./Button.jsx";

export default function FormAddFriend() {

	return <form className="form-add-friend">
		<label htmlFor="1">👪 Friend name</label>
		<input type="text" id="1"/>

		<label htmlFor="2">🖼️ Image URL</label>
		<input type="text" id="2"/>

		<Button>Add</Button>
	</form>
}
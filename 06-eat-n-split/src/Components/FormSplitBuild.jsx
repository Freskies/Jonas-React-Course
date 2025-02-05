import { friendType } from "../Friends.js";
import { useState } from "react";

FormSplitBuild.propTypes = {
	friend: friendType,
};

export default function FormSplitBuild ({ friend: { id, name, balance } }) {
	const [bill, setBill] = useState("");
	const [yourExpense, setYourExpense] = useState("");
	const [friendExpense, setFriendExpense] = useState("");
	const [whoPays, setWhoPays] = useState("user");

	function getExpense (bill, expense) {
		return bill >= expense ? expense : bill;
	}

	return <form className="form-split-bill">
		<h2>Split a bill with {name}</h2>

		<label htmlFor="10">💰 Bill value</label>
		<input
			type="number"
			id="10"
			value={bill}
			onChange={(e) => setBill(`${+e.target.value}`)}
		/>

		<label htmlFor="11">🧑‍🦰 Your expense</label>
		<input
			type="number"
			id="11"
			value={whoPays === "user" ? yourExpense : bill - friendExpense}
			onChange={(e) => setYourExpense(`${getExpense(+bill, +e.target.value)}`)}
			disabled={whoPays === "friend"}
		/>

		<label htmlFor="12">👨‍👩‍👧‍👦 {name}'s expense</label>
		<input
			type="number"
			id="12"
			value={whoPays === "friend" ? friendExpense : bill - yourExpense}
			onChange={(e) => setFriendExpense(`${getExpense(+bill, +e.target.value)}`)}
			disabled={whoPays === "user"}
		/>

		<label htmlFor="13">🤑 Who is paying the bill</label>
		<select
			id="13"
			value={whoPays}
			onChange={(e) => setWhoPays(e.target.value)}
		>
			<option value="user">You</option>
			<option value="friend">{name}</option>
		</select>
	</form>;
}
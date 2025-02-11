import { friendType } from "../Friends.js";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";

FormSplitBill.propTypes = {
	friend: friendType.isRequired,
	onSplitBill: PropTypes.func.isRequired,
};

export default function FormSplitBill ({ friend: { id, name }, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [yourExpense, setYourExpense] = useState("");
	const [friendExpense, setFriendExpense] = useState("");
	const [whoPays, setWhoPays] = useState("user");

	function getExpense (bill, expense) {
		return bill >= expense ? expense : bill;
	}

	function handleSubmit (e) {
		e.preventDefault();
		const okYourExpense = whoPays === "user" ? yourExpense : true;
		const okFriendExpense = whoPays === "friend" ? friendExpense : true;
		if (!bill || !okYourExpense || !okFriendExpense) return;

		onSplitBill(id, whoPays === "user" ? bill - yourExpense : friendExpense - bill);
	}

	return <form className="form-split-bill" onSubmit={handleSubmit}>
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

		<Button>Split Bill</Button>
	</form>;
}
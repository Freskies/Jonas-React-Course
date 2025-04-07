import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice.js";

function Customer () {
	const dispatch = useDispatch();
	const [fullName, setFullName] = useState("");
	const [nationalId, setNationalId] = useState("");

	function handleSubmit (e) {
		e.preventDefault();
		if (!fullName || !nationalId) return;
		dispatch(createCustomer(fullName, nationalId));
	}

	return <form onSubmit={handleSubmit}>
		<h2>Create new customer</h2>
		<div className="inputs">
			<div>
				<label>Customer full name</label>
				<input
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</div>
			<div>
				<label>National ID</label>
				<input
					value={nationalId}
					onChange={(e) => setNationalId(e.target.value)}
				/>
			</div>
			<button>Create new customer</button>
		</div>
	</form>;
}

export default Customer;

import PropTypes from "prop-types";
import { useState } from "react";

Form.propTypes = {
	onAddItems: PropTypes.func,
};

export default function Form ({ onAddItems }) {
	const [descriptionField, setDescriptionField] = useState("");
	const [quantityField, setQuantityField] = useState(1);

	function handleSubmit (e) {
		e.preventDefault();
		if (!descriptionField) return;

		onAddItems({
			description: descriptionField,
			quantity: quantityField,
			packed: false,
			id: Date.now(),
		});

		setDescriptionField("");
		setQuantityField(1);
	}

	return <form className="add-form" onSubmit={handleSubmit}>
		<h3>What do you need for your 😍 trip?</h3>
		<select value={quantityField} onChange={e => setQuantityField(+e.target.value)}>
			{Array.from({ length: 20 }, (_, i) => i + 1).map(
				n => <option value={n + ""} key={n + ""}>{n}</option>,
			)}
		</select>
		<input
			type="text"
			placeholder="Item..."
			value={descriptionField}
			onChange={e => setDescriptionField(e.target.value)}
		/>
		<button>Add</button>
	</form>;
}
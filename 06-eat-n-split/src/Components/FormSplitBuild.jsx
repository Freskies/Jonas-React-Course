export default function FormSplitBuild() {
	return <form className="form-split-bill">
		<h2>Split a bill with Carl</h2>

		<label htmlFor="10">💰 Bill value</label>
		<input type="text" id="10"/>

		<label htmlFor="11">🧑‍🦰 Your expense</label>
		<input type="text" id="11"/>

		<label htmlFor="12">👨‍👩‍👧‍👦 X's expense</label>
		<input type="text" id="12" disabled/>

		<label htmlFor="13">🤑 Who is paying the bill</label>
		<select id="13">
			<option value="user">You</option>
			<option value="friend">X</option>
		</select>
	</form>
}
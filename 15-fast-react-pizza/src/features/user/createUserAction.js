import { redirect } from "react-router-dom";
import { updateName } from "./userSlice.js";
import store from "../../store.js";

async function action ({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	if (!data.username) return () => null;
	store.dispatch(updateName(data.username));
	return redirect("/menu");
}

export default action;
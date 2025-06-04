import supabase from "./supabase.js";

async function getCabins () {
	const { data, error } = await supabase.from("cabins").select("*");
	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

export { getCabins };
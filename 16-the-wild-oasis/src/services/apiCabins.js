import supabase from "./supabase.js";

async function getCabins () {
	const { data, error } = await supabase
		.from("cabins")
		.select("*");
	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

async function createCabin (cabin) {
	const { data, error } = await supabase
		.from("cabins")
		.insert([cabin])
		.select();
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be created");
	}
	return data;
}


async function deleteCabin (id) {
	const { error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id);
	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}
}

export { getCabins, deleteCabin, createCabin };
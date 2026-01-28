import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins () {
	const { data: cabins, error } = await supabase
		.from("cabins")
		.select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return cabins;
}

export async function deleteCabin (cabinId) {
	const { error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", cabinId);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
}

export async function createEditCabin (newCabin, id = null) {
	console.log(newCabin);
	console.log(id);

	const isCreating = id === null;
	const hasImage = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace(/\s+/g, "_").replace(/\\/g, "/").toLowerCase();
	const imagePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin.images/${imageName}`;

	// CREATE/EDIT CABIN
	let query = supabase.from("cabins");
	if (isCreating) query = query.insert([{ ...newCabin, image: imagePath }]);
	else query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
	const { data, error } = await query;

	if (error) throw new Error(`Cabin could not be ${isCreating ? "created" : "edited"}`);

	// UPLOAD IMAGE
	if (!hasImage) {
		const { error: storageError } = await supabase.storage
			.from("cabin.images")
			.upload(imageName, newCabin.image);

		if (storageError)
			throw new Error(
				`Cabin image could not be uploaded for ${isCreating ? "creation" : "editing"} of cabin with ID ${id}
				`);
	}

	return data;
}
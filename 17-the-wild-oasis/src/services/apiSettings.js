import supabase from "./supabase";

export async function getSettings () {
	const { data, error } = await supabase
		.from("settings")
		.select("*")
		.single();

	if (error) throw new Error("Settings could not be loaded");
	return data;
}

// newSetting -> {setting: newValue}
export async function updateSetting (newSetting) {
	const { data, error } = await supabase
		.from("settings")
		.update(newSetting)
		.eq("id", 1) // There is only ONE row of settings, with ID=1
		.single();

	if (error) throw new Error("Settings could not be updated");
	return data;
}

import supabase from "./supabase.js";

export async function login ({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) throw new Error(`Login failed: ${error.message}`);
	return data;
}

export async function logout () {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(`Logout failed: ${error.message}`);
}

export async function getCurrentUser () {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw new Error(`Failed to get current user: ${error.message}`);
	return data?.user;
}

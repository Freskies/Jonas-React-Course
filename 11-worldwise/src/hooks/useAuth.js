import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export default function useAuth () {
	const context = useContext(AuthContext);
	if (!context) throw new Error("AuthContext was used outside AuthProvider");
	return context;
}
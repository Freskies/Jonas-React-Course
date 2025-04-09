import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		createCustomer: {
			prepare (fullName, nationalID) {
				return { payload: { fullName, nationalID, createdAt: new Date().toISOString() } };
			},
			reducer (state, { payload }) {
				state.fullName = payload.fullName;
				state.nationalID = payload.nationalID;
				state.createdAt = payload.createdAt;
			},
		},
		updateName (state, { payload }) {
			state.fullName = payload;
		},
	},
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;
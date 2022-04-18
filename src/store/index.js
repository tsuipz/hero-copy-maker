import { configureStore } from "@reduxjs/toolkit";
import copySlice from "./copy-slice";

const store = configureStore({
	reducer: {
		copy: copySlice.reducer,
	},
});

export default store;

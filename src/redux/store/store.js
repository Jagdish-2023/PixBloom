import { configureStore } from "@reduxjs/toolkit";
import { photoSlice } from "../slice/photoSlice";

const store = configureStore({ reducer: { photos: photoSlice.reducer } });

export default store;

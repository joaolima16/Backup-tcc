import { configureStore } from "@reduxjs/toolkit";
import Token from "../reducers/Token";

export default configureStore({
    reducer:{
        Token
    },
});
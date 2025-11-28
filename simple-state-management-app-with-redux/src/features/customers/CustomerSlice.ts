import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CustomerStateType } from "../../types/CustomerStateType";

const initialState: CustomerStateType = {
    fullName: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
        updateName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
// export function createCustomer(fullName: string): CustomerReducerActionType {
//     return { type: "customer/createCustomer", payload: fullName };
// }

// export function updateName(fullName: string): CustomerReducerActionType {
//     return { type: "customer/updateName", payload: fullName };
// }

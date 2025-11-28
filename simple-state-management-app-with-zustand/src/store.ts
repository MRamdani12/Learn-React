import { create } from "zustand";
import type { StoreState } from "./types/StoreState";
import { customerSlice } from "./features/customers/CustomerSlice";
import { accountSlice } from "./features/accounts/AccountSlice";

export const store = create<StoreState>()((set, get, store) => ({
    ...customerSlice(set, get, store),
    ...accountSlice(set, get, store),
}));

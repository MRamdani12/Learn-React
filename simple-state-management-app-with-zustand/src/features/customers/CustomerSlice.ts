import { type StateCreator } from "zustand";
import type { CustomerSliceType, StoreState } from "../../types/StoreState";

export const customerSlice: StateCreator<
    StoreState,
    [],
    [],
    CustomerSliceType
> = (set) => ({
    fullName: "",
    createdAt: "",
    createCustomer: (fullName) =>
        set({ fullName: fullName, createdAt: new Date().toISOString() }),
    changeName: (fullName) => set({ fullName: fullName }),
});

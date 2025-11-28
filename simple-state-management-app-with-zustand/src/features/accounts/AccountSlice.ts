import type { StateCreator } from "zustand";
import type { AccountSliceType, StoreState } from "../../types/StoreState";

type FFResponse = {
    rates: {
        [key: string]: number;
    };
};

export const accountSlice: StateCreator<
    StoreState,
    [],
    [],
    AccountSliceType
> = (set) => ({
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
    deposit: async (amount, currency) => {
        if (currency === "USD") {
            set((state) => ({ balance: state.balance + amount }));
            return;
        }
        set({ isLoading: true });
        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
        );
        if (!res.ok) throw new Error("Something's wrong, try again later");
        const data: FFResponse = await res.json();
        const convertedCurrency = amount * data.rates["USD"];

        set((state) => ({ balance: state.balance + convertedCurrency }));
        set({ isLoading: false });
    },

    withdraw: (amount) => {
        set((state) => {
            if (state.balance < amount) {
                alert("Not enough balance to withdraw");
                return state;
            }

            return {
                balance: state.balance - amount,
            };
        });
    },

    requestLoan: (amount: number, loanPurpose: string) => {
        set((state: AccountSliceType) => ({
            balance: state.balance + amount,
            loan: amount,
            loanPurpose: loanPurpose,
        }));
    },

    payLoan: () =>
        set((state) => {
            if (state.balance < state.loan) {
                alert("Balance is not enough to pay loan");
                return state;
            }

            return {
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: "",
            };
        }),
});

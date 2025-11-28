import type { ThunkDispatch } from "redux-thunk";
import type { AccountStateType } from "../../types/AccountStateType";
import type { RootState } from "../../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FFResponse = {
    rates: {
        [key: string]: number;
    };
};

const initialState: AccountStateType = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw: (state, action: PayloadAction<number>) => {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare: (loan: number, loanPurpose: string) => {
                return {
                    payload: { loan, loanPurpose },
                };
            },

            reducer: (
                state,
                action: PayloadAction<{ loan: number; loanPurpose: string }>
            ) => {
                if (state.loan) return state;

                state.balance += action.payload.loan;
                state.loanPurpose = action.payload.loanPurpose;
            },
        },
        payLoan: (state) => {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency: (state) => {
            state.isLoading = true;
        },
    },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

type ConvertCurrencyMiddleware = {
    type: "account/convertingCurrency" | "account/deposit";
    payload?: number;
};

export function depositAccount(amount: number, currency: string) {
    if (currency === "USD") {
        return { type: "account/deposit", payload: amount };
    }

    return async (
        dispatch: ThunkDispatch<RootState, unknown, ConvertCurrencyMiddleware>
    ) => {
        console.log("running");
        dispatch({ type: "account/convertingCurrency" });
        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
        );
        if (!res.ok) throw new Error("Something's wrong, try again later");
        const data: FFResponse = await res.json();
        const convertedCurrency = data.rates.USD * amount;

        console.log(data.rates);
        dispatch({ type: "account/deposit", payload: convertedCurrency });
    };
}

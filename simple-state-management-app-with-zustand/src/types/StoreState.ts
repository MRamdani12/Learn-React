export type CustomerSliceType = {
    fullName: string;
    createdAt: string;
    createCustomer: (fullName: string) => void;
    changeName: (fullName: string) => void;
};

export type AccountSliceType = {
    balance: number;
    loan: number;
    loanPurpose: string;
    isLoading: boolean;
    deposit: (amount: number, currency: string) => void;
    withdraw: (amount: number) => void;
    requestLoan: (amount: number, loanPurpose: string) => void;
    payLoan: () => void;
};

export type StoreState = CustomerSliceType & AccountSliceType;

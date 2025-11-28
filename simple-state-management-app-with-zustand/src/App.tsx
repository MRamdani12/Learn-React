import CreateCustomer from "./features/customers/CreateCustomer.tsx";
import Customer from "./features/customers/Customer.tsx";
import AccountOperations from "./features/accounts/AccountOperations.tsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.tsx";
import { store } from "./store.ts";

function App() {
    const fullName = store((state) => state.fullName);
    const balance = store((state) => state.balance);

    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {fullName ? (
                <>
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay balance={balance} />
                </>
            ) : (
                <CreateCustomer />
            )}
        </div>
    );
}

export default App;

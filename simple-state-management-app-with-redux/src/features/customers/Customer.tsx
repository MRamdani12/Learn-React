import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function Customer() {
    const customer = useSelector((state: RootState) => state.customer);

    return <h2>👋 Welcome, {customer.fullName}</h2>;
}

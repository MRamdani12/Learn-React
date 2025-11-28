import { store } from "../../store";

export default function Customer() {
    const fullName = store((state) => state.fullName);

    return <h2>👋 Welcome, {fullName}</h2>;
}

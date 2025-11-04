type NowAction =
    | { type: "incr"; step: number }
    | { type: "decr"; step: number };

export default function NowReducer(now: Date, action: NowAction) {
    switch (action.type) {
        case "incr": {
            const newDate = new Date(now);
            newDate.setDate(now.getDate() + action.step);
            return newDate;
        }

        case "decr": {
            const newDate = new Date(now);
            newDate.setDate(now.getDate() - action.step);
            return newDate;
        }
    }
}

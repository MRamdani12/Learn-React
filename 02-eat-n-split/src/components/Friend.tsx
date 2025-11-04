import type { FriendType } from "../types/Friend";
import Button from "./Button";

type FriendProps = {
    friend: FriendType;
    onShowBill: (id: number | string) => void;
    openId: number | string;
};

export default function Friend({ friend, onShowBill, openId }: FriendProps) {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance > 0 && (
                <p className="red">{`You owe Clark ${friend.balance}€`}</p>
            )}
            {friend.balance < 0 && (
                <p className="green">{`${friend.name} owes you ${friend.balance}€`}</p>
            )}
            {friend.balance === 0 && <p>{`You and ${friend.name} are even`}</p>}
            <Button onClick={() => onShowBill(friend.id)}>
                {openId === friend.id ? "Close" : "Select"}
            </Button>
        </li>
    );
}

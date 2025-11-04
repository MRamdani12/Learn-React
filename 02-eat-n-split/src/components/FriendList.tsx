import type { FriendType } from "../types/Friend";
import Friend from "./Friend";

type FriendListProps = {
    friends: FriendType[];
    onShowBill: (id: number | string) => void;
    openId: number | string;
};

export default function FriendList({
    friends,
    onShowBill,
    openId,
}: FriendListProps) {
    return (
        <>
            <ul>
                {friends.map((f) => {
                    return (
                        <Friend
                            openId={openId}
                            key={f.id}
                            friend={f}
                            onShowBill={onShowBill}
                        />
                    );
                })}
            </ul>
        </>
    );
}

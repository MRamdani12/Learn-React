import { useState } from "react";
import type { FriendType } from "../types/Friend";
import FriendList from "./FriendList";
import FormAddFriend from "./FormAddFriend";
import Button from "./Button";
import FormSplitBill from "./FormSplitBill";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [friends, setFriends] = useState<FriendType[]>(initialFriends);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [currOpenId, setCurrOpenId] = useState<number | string>("");

    function handleAddFriend(newFriend: FriendType) {
        setFriends((prevFriends) => [...prevFriends, newFriend]);
    }

    function handleShowBill(id: number | string) {
        if (currOpenId === id) {
            setCurrOpenId("");
        } else {
            setCurrOpenId(id);
        }
    }

    function handleSplitBill(newBalance: number) {
        const newFriends = friends.map((f) => {
            if (currOpenId === f.id) {
                return { ...f, balance: newBalance };
            } else {
                return f;
            }
        });

        setFriends(newFriends);
        setCurrOpenId("");
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendList
                    friends={friends}
                    onShowBill={handleShowBill}
                    openId={currOpenId}
                />
                <FormAddFriend
                    onAddFriend={handleAddFriend}
                    isDisplayed={showAddFriend}
                />
                <Button onClick={() => setShowAddFriend(!showAddFriend)}>
                    {showAddFriend ? "Close" : "Add friend"}
                </Button>
            </div>
            {currOpenId && (
                <FormSplitBill
                    friend={friends.find((f) => f.id === currOpenId)!}
                    onSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

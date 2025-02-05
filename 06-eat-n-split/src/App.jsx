import FriendsList from "./Components/FriendsList.jsx";
import { initialFriends } from "./Friends.js";
import FormAddFriend from "./Components/FormAddFriend.jsx";
import FormSplitBuild from "./Components/FormSplitBuild.jsx";
import { useState } from "react";

export default function App () {
	const [friendList, setFriendList] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleAddFriend (friend) {
		setFriendList((friendList) => [...friendList, friend]);
	}

	function handleSelectFriend (friend) {
		setSelectedFriend((selectedFriend) => selectedFriend === friend ? null : friend);
	}

	const activeFriend = friendList.find(({ id }) => id === selectedFriend);

	return <div className="app">
		<div className="sidebar">
			<FriendsList
				friends={friendList}
				selectedFriend={selectedFriend}
				onSelectFriend={handleSelectFriend}
			/>
			<FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
		</div>
		{selectedFriend && <FormSplitBuild friend={activeFriend}></FormSplitBuild>}
	</div>;
}
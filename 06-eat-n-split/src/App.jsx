import FriendsList from "./Components/FriendsList.jsx";
import { initialFriends } from "./Friends.js";
import FormAddFriend from "./Components/FormAddFriend.jsx";
import FormSplitBuild from "./Components/FormSplitBuild.jsx";
import { useState } from "react";

export default function App () {
	const [friendList, setFriendList] = useState(initialFriends);

	function handleAddFriend (friend) {
		setFriendList((friendList) => [...friendList, friend])
	}

	return <div className="app">
		<div className="sidebar">
			<FriendsList friends={friendList}/>
			<FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
		</div>
		<FormSplitBuild></FormSplitBuild>
	</div>;
}
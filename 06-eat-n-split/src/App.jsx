import FriendsList from "./Components/FriendsList.jsx";
import { initialFriends } from "./Friends.js";
import FormAddFriend from "./Components/FormAddFriend.jsx";
import FormSplitBuild from "./Components/FormSplitBuild.jsx";

export default function App () {
	return <div className="app">
		<div className="sidebar">
			<FriendsList friends={initialFriends}/>
			<FormAddFriend></FormAddFriend>
		</div>
		<FormSplitBuild></FormSplitBuild>
	</div>;
}
import PropTypes from "prop-types";
import { friendType } from "./../Friends.js";
import Friend from "./Friend.jsx";

FriendsList.propTypes = {
	friends: PropTypes.arrayOf(friendType).isRequired,
	onSelectFriend: PropTypes.func.isRequired,
	selectedFriend: PropTypes.string,
};

export default function FriendsList ({ friends, onSelectFriend, selectedFriend }) {
	return <ul>
		{friends.map(friend => <Friend
			friend={friend}
			key={friend.id}
			onSelectFriend={onSelectFriend}
			isSelected={selectedFriend === friend.id}
		/>)}
	</ul>;
}
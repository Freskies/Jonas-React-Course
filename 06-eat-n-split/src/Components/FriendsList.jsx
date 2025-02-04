import PropTypes from "prop-types";
import { friendType } from "./../Friends.js";
import Friend from "./Friend.jsx";

FriendsList.propTypes = PropTypes.arrayOf(friendType).isRequired;

export default function FriendsList ({ friends }) {
	return <ul>
		{friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
	</ul>;
}
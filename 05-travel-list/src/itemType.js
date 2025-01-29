import PropTypes from "prop-types";

export const itemType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
	quantity: PropTypes.number.isRequired,
	packed: PropTypes.bool.isRequired,
});
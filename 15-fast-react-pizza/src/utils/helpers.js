function formatCurrency (value) {
	return new Intl.NumberFormat("en", {
		style: "currency",
		currency: "EUR",
	}).format(value);
}

function formatDate (dateStr) {
	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(dateStr));
}

const MILLISECONDS_IN_MINUTE = 60000;

function calcMinutesLeft (dateStr) {
	const currentTime = new Date().getTime();
	const targetTime = new Date(dateStr).getTime();
	return Math.round((targetTime - currentTime) / MILLISECONDS_IN_MINUTE);
}

export { formatCurrency, formatDate, calcMinutesLeft };

function logger(req, res, next) {
	const host = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
	const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	const ts = timestamp(new Date());

	console.log(host, "|", ip, "|", ts);
	next();
}

function timestamp(date) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const formattedDate = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

	let hour = date.getHours();
	let ampm = "AM";

	if (hour >= 12) ampm = "PM";
	if (hour > 12) hour = hour - 12;
	if (hour === 0) hour = 12;

	const formattedTime = `${hour}:${date.getMinutes()}:${date.getSeconds()}${ampm}`;
	return `${formattedDate} ${formattedTime}`;
}

module.exports = logger;

export const YMDFormat = (dateStr) => {
	if (!dateStr) return null;
	const date = new Date(dateStr),
		year = date.getFullYear(),
		month = date.getMonth() + 1 > 9 ? "" : "0" + (date.getMonth() + 1),
		day = (date.getDate() > 9 ? "" : "0") + date.getDate();
	return year + "-" + month + "-" + day;
};

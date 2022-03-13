module.exports = {
	makeId: (length = 16) => {
		let result = "";
		const characters =
			"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		const charLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(parseInt(Math.random() * charLength));
		}
		return result;
	}
};

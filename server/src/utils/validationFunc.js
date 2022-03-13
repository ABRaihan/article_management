module.exports = {
    isEmptyArray: (array) => {
        return Array.isArray(array) && array.length === 0 ? true : false;
    }
}
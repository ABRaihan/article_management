export const isValidObject = obj => {
    if (!obj) return false;
    const validObj = Object.keys(obj).filter(key => obj[key]);
    return isValidArray(validObj);
}

export const isValidArray = arr => {
    console.log(arr)
    return Array.isArray(arr) && arr.length > 0 ? true : false;
}
const renameProps = (obj, keysMap) => Object
    .keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
    }), {});
export {renameProps};
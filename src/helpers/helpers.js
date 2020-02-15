const renameProps = (obj, keysMap) => Object
    .keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
    }), {});

const justDate = date =>{
    return date.getFullYear() + '-' + (date.getMonth()+1)+ '-' + date.getDate()
};


export {renameProps,justDate};


function paginateData(arr, limit, offset) {
    if(!limit)
        return arr;

    const start = limit * offset;
    const end = start + limit;
    return arr.slice(start, end); 
}

module.exports = {
    paginateData
};
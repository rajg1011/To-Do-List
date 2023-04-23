exports.getDate = function () {
    const options= {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    };
    const currentdate= new Date();
    return currentdate.toLocaleDateString('en-us', options);
};

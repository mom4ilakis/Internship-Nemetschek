function debounce(func, wait, immidiate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;
        let callNow = immidiate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;

            if (!immidiate) {
                func.apply(context, args);
            }
        }, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = uuid;

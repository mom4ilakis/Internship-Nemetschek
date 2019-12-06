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
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

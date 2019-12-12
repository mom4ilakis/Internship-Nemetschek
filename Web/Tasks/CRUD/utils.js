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

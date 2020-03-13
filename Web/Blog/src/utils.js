
const utils = {
    formatDate: (date_str) => {
        if (date_str) {
            const date = new Date(date_str);
            return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
        } else {
            return '';
        }
    },
    formatTime: (date_str) => {
        if (date_str) {
            const date = new Date(date_str);
            const hours = date.getUTCHours() >= 10 ? date.getUTCHours() : '0' + date.getUTCHours();
            const minutes = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : '0' + date.getUTCMinutes();
            return `${hours}:${minutes}`;
        }
    },
    validURL: (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
};



export default utils;

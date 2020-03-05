
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
            return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
        }
    }
};

export default utils;

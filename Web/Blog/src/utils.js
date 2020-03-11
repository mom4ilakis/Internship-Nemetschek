
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
    }
};

export default utils;

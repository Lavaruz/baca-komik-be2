window.USER_TOKEN = getCookie("userAuthenticate");

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const encrypt = (data, key='<%= process.env.AES_KEYS %>') => {
    if(typeof data == 'object') data = JSON.stringify(data);
    return {d: CryptoJS.AES.encrypt(data, key).toString()};
}
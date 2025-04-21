export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
};

export const removeCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}; 
const encode = (input) => {
    return btoa(encodeURIComponent(input))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const decode = (input) => {
    return decodeURIComponent(atob(input.replace(/-/g, '+').replace(/_/g, '/')));
}
const setPageTitle = (title) => {
    document.title = title;
}

const isUserLoggedIn = () => {
    const userJwtToken = localStorage.getItem("userJwtToken");

    return !!userJwtToken;
}

const getUserJwtToken = () => {
    const userJwtToken = localStorage.getItem("userJwtToken");

    return userJwtToken;
}

const getUserData = () => {
    const userData = localStorage.getItem("userData") || "{}";

    return JSON.parse(userData);
}

const logoutUser = () => {
    localStorage.clear();
    setTimeout(() => {
        window.location.href = "/login";
    }, 1000);
};

export { setPageTitle, isUserLoggedIn, getUserJwtToken, getUserData, logoutUser };
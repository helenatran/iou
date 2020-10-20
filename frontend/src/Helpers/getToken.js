function getToken() {
    try {
        let token = localStorage.getItem("token").split('.')[1];
        return JSON.parse(atob(token));
    } catch (e) {
        //window.location = '/';
        return false;
    }
}

export default getToken;
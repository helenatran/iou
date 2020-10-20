function getToken() {
    try {
        let token = localStorage.getItem("token").split('.')[1];
        return JSON.parse(atob(token));
    } catch (e) {
        return false;
        //window.location = '/';
    }
}

export default getToken;
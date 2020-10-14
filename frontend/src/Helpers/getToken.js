function getToken() {
    try {
        let token = localStorage.getItem("token").split('.')[1];
        return JSON.parse(atob(token));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default getToken;
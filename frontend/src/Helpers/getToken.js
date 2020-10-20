function getToken() {
    try {
        let token = localStorage.getItem("token").split('.')[1];
        return JSON.parse(atob(token));
    } catch (e) {
        //console.log("I am the culprit")
        window.location = '/';
    }
}

export default getToken;
/*
 * Helper method to get payload of the JWT token stored in localStorage
 * Method will extract the JWT Payload and then return the base64 decoded value of the payload which contains the userID
 */
function getToken() {
    try {
        let token = localStorage.getItem("token").split('.')[1];
        return JSON.parse(atob(token));
    } catch (e) {
        return null;
    }
}

export default getToken;
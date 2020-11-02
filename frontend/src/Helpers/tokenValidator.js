/*
 * Helper method to check validity of the user's supplied token
 * API call will return true if the token is valid
 */
import axios from 'axios';

async function validateToken() {
    try {
        const tokenCheck = await axios.post('/api/user/validateToken', null, {
            headers: {
              "token": localStorage.getItem('token')
            }
          });
        return(tokenCheck.data ? true : false)
    } catch (err) {
        return false;
    }
}

export default validateToken;
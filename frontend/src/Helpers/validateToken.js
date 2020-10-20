import axios from 'axios';

async function validateToken() {
    try {
        await axios.post('/api/user/validateToken', null, {
            headers: {
              "token": localStorage.getItem('token')
            }
          });
        return true
    } catch (err) {
        return false;
    }
}

export default validateToken;
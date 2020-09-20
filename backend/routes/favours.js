// import {
//     getFavours,
//     createFavour
// } from '../controllers/favourControllers';

const getFavours = require('../controllers/favourControllers');
const createFavour = require('../controllers/favourControllers');

const routes = (app) => {
    app.route('/favoursList')
        .get(getFavours)
        .post(createFavour)
}

module.exports = routes;
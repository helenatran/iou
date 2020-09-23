# iou

Advanced Internet Programming Assessment 2, Group 2

## How to run the project

Make sure to install the npm packages in both the `frontend` and `backend` folders.

Run `npm install` in both folders.

Then create the react production optimized build by running `npm run-script build`.

Then run the project by typing `npm start` in the terminal.

Note: A `.env` file is needed in the `backend` folder to contain the URI for the Atlas Database among other things that we don't want exposed to the public

## How to run tests

To run all the tests in the backend, `cd` into `backend` folder and use `npm test` command in the terminal.

To run one test file, run the `npm run test-something` where `something` is your feature (eg. `test-favours`, `test-requests`, `test-users`).
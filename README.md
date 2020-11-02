# iou

This repository houses the code base for the 'iou' application created for 31242 Advanced Internet Programming Assessment 2 in 2020 Spring Semester

## Structure

The project has been split into two halves, `backend` and `frontend`

`backend` is build with ExpressJS and houses the REST APIs and business logic

`frontend` is a `react` front end built with `create-react-app`

### Backend

#### Folder Structure

```
src
  │   app.ts        # App entry point and setup
  └───middleware    # Middleware methods and functions
  └───models        # ORM/db Models and classes
  └───repositories  # Collection oriented data-access logic
  └───routes        # HTTP RESTful endpoints
  └───services      # Business logic
  └───exceptions    # Custom exception classes
  └───utls          # Helper functions and methods
```

## How to run the project

Make sure to install the npm packages in both the `frontend` and `backend` folders.

Run `npm install` in both folders.

Then create the react production optimized build by running `npm run-script build`.

Then run the project by typing `npm start` in the terminal.

Note: A `.env` file is needed in the `backend` folder to contain the URI for the Atlas Database among other things that we don't want exposed to the public

## Contributors

Group Number: 2

Members:

* Amara Tut
* Helena Tran
* Rachel Hsia
* Jason Ko

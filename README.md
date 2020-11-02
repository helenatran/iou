# iou

This repository houses the code base for the 'iou' application created for 31242 Advanced Internet Programming Assessment 2 in 2020 Spring Semester

## Structure

The project has been split into two halves, `backend` and `frontend`

`backend` is build with ExpressJS and houses the REST APIs and business logic

`frontend` is a `react` front end built with `create-react-app`

### Backend

#### Folder Structure

```markdown
src
  └───controllers   # Business logic called by the REST API
  └───middleware    # Middleware functions
  └───models        # MongooseJS Schemas
  └───routes        # REST API endpoints
      server.js     # Start point of backend
```

### Frontend

#### Folder Structure

```markdown
src
  └───Context       # Context API
  └───Helpers       # Useful helper functions
  └───navBar        # Navigation bar rendering
  └───Routes        # Components for different site features
      index.js      # Start point of frontend
      App.js        # Routing logic for frontend components
```

## How to run the project

### Prerequisites

* Install packages by running `cd backend && npm install` and `cd frontend && npm install`
* Create an optomised build for `frontend` by running `cd frontend && npm run-script build`
* A `.env` file is needed in the `backend` folder to store environment variables like:
  * ATLAS_URI - MongoDB Atlas connection string for database connectivity
  * SALT_ROUNDS - Number of times to salt a plain text password
  * JWT_SECRET - Secret key to sign JWT t
  * AWS_BUCKET_NAME - AWS S3 Bucket Name
  * AWS_ACCESS_KEY_ID - AWS S3 Bucket Access Key ID
  * AWS_SECRET_ACCESS_KEY= AWS S3 Bucket Access Key
  * AWS_Uploaded_File_URL_LINK - AWS S3 Bucket URL

### Starting the project

To start the project, first start the server by running `cd backend && node server.js`

Then start the frontend by running `cd frontend && npm start`

Navigate to `http://localhost:3000` in your browser to access the application

## Contributors

Group Number: 2

Members:

* Amara Tut
* Helena Tran
* Rachel Hsia
* Jason Ko

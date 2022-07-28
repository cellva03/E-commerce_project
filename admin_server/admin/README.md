# Admin UI Application

It is an React application where An admin can do CRUD on both products and users with the UI

## Used Packages

 - [MaterialUI](https://www.npmjs.com/package/@material-ui/core)
 - [Bootsrap](https://www.npmjs.com/package/bootstrap)
 - [Jwt-Decode](https://www.npmjs.com/package/jwt-decode)
 - [React-hook-form](https://www.npmjs.com/package/react-hook-form)
 - [React-pro-sidebar](https://www.npmjs.com/package/react-pro-sidebar)
 - [React-router-dom](https://www.npmjs.com/package/react-router-dom)

 # API Reference for Backend

## User API

#### Get all user in DataGrid uses Material UI

```http
  GET /api/users
```
#### Delete user 

```http
  DELETE /api/users/${id}
```
#### Update user

```http
  POST /api/users/update/{id}
```
#### Add New user

```http
  POST /api/users/new
```

#### Get a single user

```http
  GET /api/users/${id}
```

## Product API
#### Get all product

```http
  GET /api/products
```
#### Delete product

```http
  DELETE /api/products/${id}
```
#### Update product

```http
  POST /api/products/update/{id}
```
#### Add New product

```http
  POST /api/products/new
```

#### Get a single product

```http
  GET /api/products/${id}
```

## Admin API

### Login to app

```http
  POST /api/auth/login
```

### Signup to app

```http
  POST /api/auth/signup
```
### Verify the Admin

```http
  POST /api/auth/populate
```



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/)

## Authors

- [@KumarHarsh](https://github.com/KumarHarsh2001)
- [@Yashgade](https://github.com/Yashgade)
- [@Selva](https://github.com/cellva03)


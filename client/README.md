
# Shop4Home

It is a Responsive Reactjs web application for purchasing a home furnitures and decorations.

## Used Packages

 - [MaterialUI](https://www.npmjs.com/package/@material-ui/core)
 - [Bootsrap](https://www.npmjs.com/package/bootstrap)
 - [React-hook-form](https://www.npmjs.com/package/react-hook-form)
 - [React-router-dom](https://www.npmjs.com/package/react-router-dom)
 - [styled-components](https://www.npmjs.com/package/styled-components)
 
# API Reference for Backend

## User API

#### Login the user

```http
  POST /api/auth/login
```
#### Register a User

```http
  POST /api/auth/signup
```
#### Post cart Products

```http
  POST /api/auth/cart
```
#### Get cart from Database

```http
  GET /api/auth/cart
```

#### Remove a product from a Cart

```http
  DELET /api/auth/cart/${id}
```
#### Post wishList Products

```http
  POST /api/auth/wish
```
#### Get wishlist from Database

```http
  GET /api/auth/wish
```

#### Remove a product from a wishlist

```http
  DELET /api/auth/wish/${id}
```

#### Check Order for a user
```http
  POST /api/auth/checkout
```

## Product API
#### Get all product

```http
  GET /api/products
```
#### Get a single product

```http
  GET /api/products/${id}
```
## Steps to run
In the project root directory, you can run:

### `npm install `

It will install all the necessary packages to `node_module` folder

then, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.
## Authors

- [@KumarHarsh](https://github.com/KumarHarsh2001)
- [@Yashgade](https://github.com/Yashgade)
- [@Selva](https://github.com/cellva03)


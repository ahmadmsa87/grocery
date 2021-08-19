# grocery

Grocery Microcervices
Created by Ahmad Saleh

## Features

- The Gateway MS is doing the route part and handle all the requests from the outside and offer the security check, it includes:

- \*\*api/auth (POST) to login into the system
- \*\*api/register (POST) to register users
- \*\*api/products (POST) to add products
- \*\*api/products/search (POST) to do the search in the products
- \*\*api/products/review (POST) to review a product

## Install

- To setup the environment you need node.js to be installed on your system
  after that you need to enter each Microcervice's directorty and run:

```sh
yarn
```

or:

```sh
npm install
```

then you need to run:

```sh
yarn start
```

or:

```sh
npm start
```

- The database has been served on the cloud so you don't to worry about it.
  I have attached the Postman collections with some screen shots related to the Apis.

- Here are the https response statuses:

* Return 401 if client is not logged in
* Return 400 if you have bad request.
* Return 200 if valid request.

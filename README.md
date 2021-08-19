# grocery

GROCERY

Grocery Microcervices
Created by Ahmad Saleh

To setup the environment you need node.js to be installed on your system
after that you need to enter each Microcervice's directorty and run:
yarn
or:
npm install
then you need to run:
yarn start
or:
npm start

The database has been served on the cloud so you don't to worry about it.
I have attached the Postman collections with some screen shots related to the Apis.

Here you can find the https response statuses:

Return 401 if client is not logged in
Return 400 if you have bad request.
Return 200 if valid request.

The Gateway MS is doing the route part and handle all the requests from the outside and offer the security check.

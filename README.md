# TrailBlazer
Yelp, but for hiking trails.

## To Use

TrailBlazer is not quite ready for primetime, and as such is not hosted anywhere. If you wish to build it, you will need to supply a MySQL database to connect to and a dbConfig.js in the models folder, set up like the following:

```Javascript

module.exports ={ 
    user: ....,
host: ....,
dbname: ....,
pw: ....,
port: ....,
}

```

Alternatively, you can hardcode any SQL database information into the index.js file in the models folder and the sessionStore setup in app.js (make sure to comment out the calls to dbconfig).

You'll also need
 - to supply a secret for the session storage at [Line 29 in app.js](https://github.com/ZachJDev/TrailBlazer/blob/master/app.js#L29).
 - to have an active Google Cloud Platform API Key. It belongs in a simple JS export in the /configs directory following the shape of the public config here: https://www.npmjs.com/package/googlemaps#usage

After that, simply running `npm install` should get you everything you need.

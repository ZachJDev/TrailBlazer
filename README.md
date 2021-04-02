# TrailBlazer
Yelp, but for hiking trails.

## To Use

TrailBlazer is  still in its early stages, and as such is not hosted anywhere. If you wish to build it, you will need to supply a MySQL database to connect to and a dbConfig.js in the models folder, set up like the following:

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

Additionally, You'll need to supply a secret for the session storage at [Line 29 in app.js](https://github.com/ZachJDev/TrailBlazer/blob/master/app.js#L29).

After that, simply running `npm install` should get you everything you need.

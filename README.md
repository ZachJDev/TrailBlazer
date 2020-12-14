# TrailBlazer
Yelp, but for hiking trails.

## To Use

TrailBlazer is  still in its early stages, and as such is not hosted anywhere at the moment. If you wish to build it, you will need to supply a MySQL database to connect to and a dbConfig.js in the models folder, set up like the following:

```Javascript

module.exports ={ 
    user: ....,
host: ....,
dbname: ....,
pw: ....,
port: ....,
}

```

Alternatively, you can hardcode any SQL database information into the index.js file in the models folder.

After that, simply running `npm install` should get you everything you need.
const fetch = require('node-fetch')
const {AuthenticationError} = require('../classes/Errors');
const db = require('../models/index');

const getGeocodeAsync = require('../functions/getGeocodeAsync')

exports.getOne = (req, res, next) => {
    let parkId = req.params.parkId;
    db.Park.findOne({where: {parkId: parkId}, include: [db.Trail]}).then((park) => {
        if (park !== null) {
            res.json(park.dataValues);
        } else {
            res.status(404).send('');
            console.log(`Could not find Park with id ${parkId}`);
        }
    }).catch(e => {
        console.log('Error When Looking for Park');
    });
};

exports.add = (req, res, next) => {
    let status = 200;
    const {
        name,
        address,
        country,
        state,
        zipCode,
        city,
        description,
    } = req.body;
    // 1. confirm that all the required information is present
    let body = {foo: 'bar'};
    body.errors = getEmptyProps(req.body);
    // I don't love this double error handling. I should look for a way to maybe turn this check into a promise,
    // Then chain it with the other stuff.
    try {
        if (body.errors.length > 0) {
            body.errorMessage = 'Missing Required Information';
            status = 400;
            throw new Error('missing Information');
        }
        const geocodeParams = {
            address:   `${address}, ${city} ${state}, ${zipCode}`
        }
        getGeocodeAsync(geocodeParams).then(res => {
            const locGeo = res.results[0].geometry;
            return db.Park.create({
                name,
                address,
                country,
                state,
                city,
                zipCode,
                description,
                location: {type: 'Point', coordinates: [locGeo.location.lat, locGeo.location.lng]}
            })
        })
            .then((park) => {
                // console.log(park);
                console.log('Park Added', park.parkId);
                res.status(200).json({parkId: park.parkId});
            })
            .catch((e) => {
                console.log(e.message)
                body.errors.push(e.message)
                res.status(400).json(body);
            });
    } catch (e) {
        console.log(body);
        console.log(e.message);
        res.status(status).json(body);
    }
};

exports.update = (req, res, next) => {
    const parkId = req.params.parkId;
    // need to get form data here.
    if (req.user.isAdmin) {
        db.Park.update({...req.body}, {where: {parkId}})
            .then(Park => {
                res.status(200).json({success: true});
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(500).json({success: false, error: "NOT_ADMIN"})
    }
};

exports.delete = (req, res, next) => {
};

const getEmptyProps = (object) => {
    let errors = [];
    for (prop in object) {
        if (!object[prop]) {
            errors.push(prop);
        }
    }
    return errors;
};

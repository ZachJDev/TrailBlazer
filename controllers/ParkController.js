const db = require("../models/index");

exports.getOne = (req, res, next) => {
  let parkId = req.params.parkId;
  db.Park.findOne({ where: { parkId: parkId }, include:[db.Trail] }).then((park) => {
    if (park !== null) {

      res.json(park.dataValues);
      console.log("Park Found");
    } else {
      res.status(404).send("");
      console.log(`Could not find Park with id ${parkId}`);
    }
  }).catch(e => {
    console.log("Error When Looking for Park")
  });
};

exports.add = (req, res, next) => {
  let status = 200;
  const {
    newParkName,
    newParkAddress,
    newParkCountry,
    newParkState,
    newParkZipCode,
    newParkCity,
    newParkDescription,
  } = req.body;
  // 1. confirm that all the required information is present
  let body = {};
  body.errors = getEmptyProps(req.body);
  // I don't love this double error handling. I should look for a way to maybe turn this check into a promise,
  // Then chain it with the other stuff.
  try {
    if (body.errors.length > 0) {
      body.errorMessage = "Missing Required Information";
      status = 400;
      throw new Error("missing Information")
    }

    // 2. check if the park already exists -- possible REFACTOR -- use sequelize to add constraints; instead of looking for the entry, just try to add it.
    db.Park.findOne({ where: { name: newParkName, state: newParkState } })
      .then((park) => {
        if (park !== null) {
          body.errors.push("Park Already Exists");
          body.errors.push(park);
          status = 409;
          throw new Error("Duplicate Park");
        }
        // 3. add the park
        // Add the park if nothing found
        else {
          return db.Park.create({
            name: newParkName,
            address: newParkAddress,
            country: newParkCountry,
            state: newParkState,
            city: newParkCity,
            zipCode: newParkZipCode,
            description: newParkDescription,
          });
        }
      })
      .then((park) => {
        console.log("Park Added");
        res.status(200).type('json').json(body);
      })
      .catch((e) => {
        console.log(e.message);
        res.status(status).type('json').json(body);
      });
  } catch (e) {
    console.log(body)
    console.log(e.message);
    res.status(status).json(body);
  }
};

exports.update = (req, res, next) => {
  // need to get form data here.
};

exports.delete = (req, res, next) => {};

const getEmptyProps = (object) => {
  let errors = [];
  for (prop in object) {
    if (!object[prop]) {
      errors.push(prop);
    }
  }
  return errors;
};

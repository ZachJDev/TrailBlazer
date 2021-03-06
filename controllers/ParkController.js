const {getRandomPic} = require('../configs/getRandomConfig')
const db = require("../models/index");

const getGeocodeAsync = require("../functions/getGeocodeAsync");

exports.getOne = (req, res, next) => {
  let parkId = req.params.parkId;
  db.Park.findOne({ where: { parkId: parkId }, include: [db.Trail] })
    .then((park) => {
      if (park !== null) {
        res.json({ ...park.dataValues, success: true, status: 200 });
      } else {
        res.status(404).json({ success: false, errors: ["Park Not Found"] });
        console.log(`Could not find Park with id ${parkId}`);
      }
    })
    .catch((e) => {
        console.log(e)
      console.log("Error When Looking for Park");
    });
};

exports.add =  async (req, res, next) => {
    const picUrl =  await getRandomPic();
  let status = 200;
  const { name, address, state, zipCode, city, description } = req.body;
  // 1. confirm that all the required information is present
  let body = { foo: "bar" };
  body.errors = getEmptyProps(req.body);
  // I don't love this double error handling. I should look for a way to maybe turn this check into a promise,
  // Then chain it with the other stuff.
  try {
    if (body.errors.length > 0) {
      body.errorMessage = "Missing Required Information";
      status = 400;
      throw new Error("missing Information");
    }
    const geocodeParams = {
      address: `${address}, ${city} ${state}, ${zipCode}`,
    };
    console.log(geocodeParams)
    getGeocodeAsync(geocodeParams)
      .then((res) => {
          console.log(res)
        const locGeo = res.results[0].geometry;
        return db.Park.create({
            picUrl,
          name,
          address,
          state,
          city,
          country: "USA",
          zipCode,
          description,
          location: {
            type: "Point",
            coordinates: [locGeo.location.lat, locGeo.location.lng],
          },
        });
      })
      .then((park) => {
        // console.log(park);
        console.log("Park Added", park.parkId);
        res.status(200).json({ parkId: park.parkId, status });
      })
      .catch((e) => {
        console.log(e.message);
        body.errors.push(e.message);
        res.status(400).json({ ...body, status });
      });
  } catch (e) {
    console.log(body);
    console.log(e.message);
    res.status(status).json({ ...body, status });
  }
};

exports.update = (req, res, next) => {
  const parkId = req.params.parkId;
  // need to get form data here.
  if (req.user.isAdmin) {
    db.Park.update({ ...req.body }, { where: { parkId } })
      .then((Park) => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        if (err.parent.errno === 1062) {
          // Duplicate Entry
          res
            .status(500)
            .json({ success: false, errorMessage: "Park Already Exists" });
        }
      });
  } else {
    res.status(500).json({ success: false, error: "NOT_ADMIN" });
  }
};

exports.delete = async (req, res, next) => {
  const parkId = req.params.parkId;
  console.log("Deleting", parkId);
  try {
    const deleteRes = await db.Park.destroy({ where: { parkId } });
    if (deleteRes !== 1) {
      res.status(400).json({ success: false, errors: ["Park does not Exist"] });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({ success: true, errors: [e.message] });
  }
};

const getEmptyProps = (object) => {
  let errors = [];
  for (let prop in object) {
    if (!object[prop]) {
      errors.push(prop);
    }
  }
  return errors;
};

const db = require("../models/index");

exports.new = (req, res, next) => {
  const { name, description, newTrailPark, length, lengthUnit } = req.body;
  db.Trail.findOne({ where: { name: name, parkId: newTrailPark } })
    .then((trail) => {
      if (trail) {
        throw new Error("Trail Already Exists");
      }
      return db.Trail.create({
        name: name,
        description: description,
        parkId: newTrailPark,
        // This automatically handles converting between miles and Km, and we will only store the length in miles.
        length: Number(lengthUnit === "m" ? length : length / 1.609344),
      }).then((createdTrail) => {
        res.status(200).json(createdTrail);
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(409).json({ errorMessage: e.message });
    });
};
exports.getOne = (req, res, next) => {
  let trailId = req.params.id;
  db.Trail.findOne({ where: { trailId: trailId }, include: [db.Park] }).then(
    (trail) => {
      if (trail) res.status(200).json(trail);
      else res.status(404).json({ status: 404, ...trail });
    }
  );
};
exports.update = (req, res, next) => {
  let trailId = req.params.trailId;
  try {
    db.Trail.update({ ...req.body }, { where: { trailId } }).then((trail) => {
      console.log(trail);
      res
        .status(200)
        .json({ success: true, trailId: trail.trailId, status: 200 });
    });
  } catch (e) {
    res.status(400).json({ success: false, errors: [e.message], status: 400 });
  }
};

exports.delete = async (req, res, next) => {
  const trailId = req.params.trailId;
  console.log("deleting Trail:", trailId);
  try {
    const deleteRes = await db.Trail.destroy({ where: { trailId } });
    console.log("deleted", deleteRes);
    if (deleteRes === 0) {
      res
        .status(400)
        .json({ success: false, errors: ["trail does not exist."] });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (e) {
    res.status(400).json({ success: false, errors: [e.message] });
  }
};

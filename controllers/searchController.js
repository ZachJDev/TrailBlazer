const db = require("../models/index");
const Op = require("sequelize").Op;

exports.search =  async (req, res) => {
    console.log('searching')
  const query = req.query.q;
  let type = req.query.type;

  if (type === "Park") {
   const results = await db.Park.findAll({ where: { name: { [Op.like]: `%${query}%` } } })
        res.status(200).json({ success: true, payload: results, type: "park" });
  }
  // I imagine there's a better way of doing this...
  // As stated elsewhere, my current pattern of sending all the rating data
  // to the client and handling the averaging there NEEDS to STOP.
  else if (type === "Trail") {
    let trails = {};
    const results = await db.Trail.search(query)
      res.status(200).json({success: true, payload: results, type: 'trail'})

  }
};

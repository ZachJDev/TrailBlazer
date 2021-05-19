module.exports.publicConfig = {
    key: process.env.GMAPS_API_PRIVATE,
    stagger_time: 1000, // for elevationPath
    encode_polylines: false,
    secure: true, // use https
};

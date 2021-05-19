const fetch = require('node-fetch')

const getRandomPic = async () =>
{
    const response = await fetch('https://source.unsplash.com/random/?hike');
   return response.url;
}

module.exports = {
    getRandomPic,
}
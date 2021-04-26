// Sequelize currently has a bug with MySql Geometry types. This fix makes it work.
// from: https://github.com/sequelize/sequelize/issues/9786
// Import this file rather than the node_modules one.

const Sequelize = require('sequelize')

const wkx = require('wkx')
Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}
Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`;
}

module.exports = Sequelize
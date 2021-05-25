// noinspection JSUnusedLocalSymbols
const db = require('../models/index');
const DEFAULT_REJECTION = require('../configs/defaultRequestRejection.json');
const {PARK_ID} = require('../configs/ColumnNameConfig').parkCols

exports.getOne = async (req, res, next) => {
    try {
        let parkId = req.params.parkId;
        const park = await db.Park.getById(parkId);
        res.status(200).json({success: true, park});
    } catch (e) {
        console.log(e.message);
        if ('sendRes' in e) {
            e.sendRes(res)('Park');
        } else {
            res.status(500).json(DEFAULT_REJECTION);
        }
    }
};

exports.add = async (req, res, next) => {
    try {
        const park = await db.Park.add(req.body);
        res.status(200).json({success: true, park: {parkId: park.parkId}});
    } catch (e) {
        console.log(e.message);
        if ('sendRes' in e) {
            e.sendRes(res)('Park');
        } else {
            res.status(500).json(DEFAULT_REJECTION);
        }
    }
};

exports.update = async (req, res, next) => {
    try {
        const parkId = req.params.parkId;
        const park = await db.Park.update(req.body, {where: {[PARK_ID]:parkId}});
        res.status(200).json({success: true, park: {parkId: park[PARK_ID]}});
    } catch (e) {
        if ('sendRes' in e) {
            e.sendRes(res)('Park');
        } else {
            res.status(500).json(DEFAULT_REJECTION);
        }
    }
};

exports.delete = async (req, res, next) => {
    try {
    const parkId = req.params.parkId;
    console.log('Deleting', parkId);
        const numDeleted = await db.Park.destroyPark(parkId)
        res.status(200).json({success: true})
    } catch (e) {
        if ('sendRes' in e) {
            e.sendRes(res)('Park');
        } else {
            res.status(500).json(DEFAULT_REJECTION);
        }
    }
};


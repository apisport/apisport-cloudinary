import { now } from 'moment';
import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getProfil(req, res) {
    const { emailReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let profil = await db
            .collection('user')
            .find({
                email: emailReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(profil)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateProfil(req, res) {
    const { nama,
        noWa,
        tim,
        objectId, } = req.body
    var ObjectId = require('mongodb').ObjectId;
    const convertedObjectId = new ObjectId(objectId);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // update the published status of the post
        await db.collection('user').updateOne(
            {
                '_id': convertedObjectId
            },
            {
                $set: {
                    'nama': nama,
                    'noWa': noWa,
                    'tim': tim,
                }
            }
        );
        // return a message
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


// CRUD handler
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getProfil(req, res);
        }
        case 'POST': {
            return addFavorit(req, res);
        }
        case 'PUT': {
            return updateProfil(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}
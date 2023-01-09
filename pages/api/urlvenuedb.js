import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getVenue(req, res) {
    const { urlVenueReq } = req.query
    let namaVenue1 = ''
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let infoVenue = await db
            .collection('mitra')
            .find({
                urlVenue: urlVenueReq,
                hariOperasional: { $ne: '' }
            })
            .sort({ idfavorit: -1 })
            .toArray();
        // return the posts
        if (infoVenue.length != 0) {
            namaVenue1 = infoVenue[0].namaVenue
            let infoLapangan = await db
                .collection('lapangan')
                .find({
                    namaVenue: namaVenue1
                })
                .sort({ idfavorit: -1 })
                .toArray();
            if(infoLapangan.length == 0){
                return res.json({
                    message: 'not-found'
                })
            }
            let hasil = {}
            hasil['infoVenue'] = infoVenue
            hasil['infoLapangan'] = infoLapangan
            // return the posts
            return res.json({
                message: JSON.parse(JSON.stringify(hasil)),
                success: true,
            });
        }else{
            return res.json({
                message: 'not-found'
            })
        }

    } catch (error) {
        // return the error
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
            return getVenue(req, res);
        }
        case 'POST': {
            return addFavorit(req, res);
        }
        case 'PUT': {
            return updateFavorit(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}
import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getProfil(req, res) {
    const { emailReq, namaVenueReq, tglMainReq, lapanganReq, diterimaTglReq, idTransaksiReq } = req.query
    var ObjectId = require('mongodb').ObjectId;
    const convertedObjectId = new ObjectId(idTransaksiReq);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let transaksi = await db
            .collection('transaksi')
            .find({
                _id: { $ne: convertedObjectId },
                namaVenue: namaVenueReq,
                lapangan: lapanganReq,
                tglMain: tglMainReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let transaksiOtomatis = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
            }, { projection: { 'buktiBayar': 0 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let lapangan = await db
            .collection('lapangan')
            .find({
                namaVenue: namaVenueReq,
            }, { projection: { 'namaLapangan': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let infoVenue = await db
            .collection('mitra')
            .find({
                namaVenue: namaVenueReq
            }, { projection: { 'namaVenue': 1, 'rekening': 1, 'opsiBayar': 1, 'DP': 1, 'email': 1, 'hariOperasional': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();

        let infoLapangan = await db
            .collection('lapangan')
            .find({
                _id: convertedObjectId
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let transaksiBelum = await db
            .collection('transaksi')
            .find({

                status: 'mitraBelum',
                namaVenue: namaVenueReq
            }, { projection: { 'status': 1 } })
            .sort({})
            .toArray();
        let infoTransaksi = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
                lapangan: namaLapanganReq,
                tglMain: tglMainReq
            }, { projection: { 'tglMain': 1, 'jadwalMain': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();

        let hasil = {}
        hasil['transaksiOtomatis'] = transaksiOtomatis
        hasil['infoVenue'] = infoVenue
        hasil['transaksi'] = transaksi
        hasil['lapangan'] = lapangan
        hasil['infoTransaksi'] = infoTransaksi
        hasil['infoLapangan'] = infoLapangan
        hasil['transaksiBelum'] = transaksiBelum
        hasil['infoVenue'] = infoVenue
        // return the posts
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(hasil)),
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
            return updateFavorit(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}
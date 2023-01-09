//@ts-check
import moment from 'moment'
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;


// mengambil data dari collection Transaksi

async function getTransaksi(req, res) {
    var currentdate = new Date();
    var dateNow = currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate()
    var startDate = moment(dateNow, "YYYY-MM-DD")

    const { namaVenueReq, tahunReq, bulanReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let bulanan = []
        let transaksi = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
                status: 'lunas'
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let transaksiTglCall = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let transaksiBelum = []
        let diff = 0
        let endDate = ''
        // if(transaksiTglCall.length >= 1){
        //     for (let i = 0; i <= transaksiTglCall.length; i++) {
        //         endDate = moment(transaksiTglCall[i].tglMain, "YYYY-MM-DD")
        //         diff = endDate.diff(startDate, 'days')
        //         if(diff >= 0){
        //             transaksiBelum.push(transaksiTglCall[i])
        //         }
        //         transaksiBelum.push(transaksiTglCall[i].tglMain)
        //     }
        // }
       
        for (let i = 0; i <= 11; i++) {
            let noBulan = i + 1
            if (noBulan < 10) {
                let bulan = await db
                    .collection('transaksi')
                    .find({
                        namaVenue: namaVenueReq,
                        tglMain: new RegExp(`${tahunReq}-0${noBulan}`),
                        status: 'lunas'
                    }, { projection: { 'harga': 1 } })
                    .sort({ idfavorit: -1 })
                    .toArray();
                bulanan[i] = bulan
            } else {
                let bulan = await db
                    .collection('transaksi')
                    .find({
                        namaVenue: namaVenueReq,
                        tglMain: new RegExp(`${tahunReq}-${noBulan}`),
                        status: 'lunas'
                    }, { projection: { 'harga': 1 } })
                    .sort({ idfavorit: -1 })
                    .toArray();
                bulanan[i] = bulan
            }

        }
        return res.json({
            message: JSON.parse(JSON.stringify(transaksi)),
            bulanan: JSON.parse(JSON.stringify(bulanan)),
            belum: JSON.parse(JSON.stringify(transaksiTglCall)),
            // belum: diff,
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

async function addTransaksi(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('transaksi').insertOne(JSON.parse(req.body));
        let id = await db.collection('transaksi').find(JSON.parse(req.body)).toArray()
        // return a message
        return res.json({
            message: id[0]._id,
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

async function deleteTransaksi(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('transaksi').deleteOne({
            '_id': convertedObjectId
        });
        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updateTransaksi(req, res) {
    const { tim,
        noRekening,
        opsiBayar,
        buktiBayar,
        objectId,
        hargaDP } = req.body
    var ObjectId = require('mongodb').ObjectId;
    const convertedObjectId = new ObjectId(objectId);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // update the published status of the post
        await db.collection('transaksi').updateOne(
            {
                '_id': convertedObjectId
            },
            {
                $set: {
                    tim: tim,
                    noRekening: noRekening,
                    opsiBayar: opsiBayar,
                    buktiBayar: buktiBayar,
                    hargaDP: hargaDP,
                }
            }
        );
        let transaksi = db.collection('transaksi').find({ '_id': convertedObjectId }).toArray()
        // return a message
        return res.json({
            message: transaksi,
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
            return getTransaksi(req, res);
        }
        case 'POST': {
            return addTransaksi(req, res);
        }
        case 'PUT': {
            return updateTransaksi(req, res);
        }
        case 'DELETE': {
            return deleteTransaksi(req, res);
        }
    }
}